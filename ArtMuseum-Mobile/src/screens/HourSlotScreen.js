import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    StatusBar,
    Vibration,
    Platform
} from 'react-native';
import {auth, database} from '../../config/firebase';
    import BookingButton from "../components/BookingButton";
    import { Notifications } from 'expo';
    import * as Permissions from 'expo-permissions';
    import Constants from 'expo-constants';



export default class HourSlotScreen extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state ={
            bookingDate: this.props.navigation.state.params.bookingDate,
            hourSlots: [],
            exhibit: this.props.navigation.state.params.exhibit,
            bookedHours: [],
            expoPushToken: '',
            notification: {},
            bookings: [],
            hourAvailability: [],
            userLimit: 0,
        }

    }


    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();
            console.log(token);
            this.setState({ expoPushToken: token });
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    guidGenerator() {
        /**
         * @return {string}
         */
        let S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }




    componentDidMount () {


        this.registerForPushNotificationsAsync();

        this.makeRequest();

        this._notificationSubscription = Notifications.addListener(this._handleNotification);


    }

    _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
    };

    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    sendPushNotification = async () => {
        const message = {
            to: this.state.expoPushToken,
            sound: 'default',
            title: 'Successfully booked',
            body: `You have booked your visit on/${this.state.bookingDate.dateString}`,
            data: { data: 'goes here' },
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    };





    makeRequest(){



        const maxSpots = this.state.exhibit.maxSpots;
        const date = this.state.bookingDate.dateString;

        let ref = database.ref('hour_slots'); // get the hour slots from firebase
        ref.once('value').then((snapshot) => {
            this.setState({ hourSlots: (snapshot.val()) });
        });


        ref = database.ref('users'); // get the appointments for current user
        ref.once('value').then((snapshot) => {
            this.setState({ bookedHours: (Object.keys(snapshot.val())) });
        });

        ref = database.ref('users/userLimit');
        ref.once('value').then((snapshot) => {
            this.setState({userLimit: snapshot.val()})
        })


        let hourAvailability = [];

        ref = database.ref('bookings'); // get the appointments for current user
        ref.once('value').then((snapshot) => {
            this.setState({ bookings: Object.values(snapshot.val()) });


            for(let j = 0; j < Object.keys(this.state.hourSlots).length;j++)
            {
                let maxSpotsHour = maxSpots;
                for(let i = 0; i < this.state.bookings.length;i++)
                {
                    if(this.state.bookings[i].hour ===  Object.keys(this.state.hourSlots)[j] && this.state.bookings[i].date == date && this.state.exhibit.id === this.state.bookings[i].exhibitId)
                    {
                        maxSpotsHour -= 1;
                    }

                }

                let obj = {
                    hourSlot: Object.values(this.state.hourSlots)[j],
                    hourKey:  Object.keys(this.state.hourSlots)[j],
                    maxSpots: maxSpotsHour
                };

                hourAvailability.push(obj);


            }

            this.setState({hourAvailability: hourAvailability})


        });

    }



    async _bookSlot(status, key, value) {

        const date = this.state.bookingDate.dateString;

        const user = auth.currentUser;
        const uid = user.uid;
        let userData = {};
        let id = this.guidGenerator();

        const maxBookingsPerAcc = this.state.userLimit;
        let userNrBookings = 0;


        const ref = database.ref('bookings');
        try{
           await ref.once('value').then((snapshot) => {
               this.setState({ bookings: Object.values(snapshot.val()) });
                for(let i = 0;i < this.state.bookings.length;i++)
                {
                    if(this.state.bookings[i].uid === auth.currentUser.uid && this.state.bookings[i].hour === value.hourKey && this.state.bookings[i].exhibitId === this.state.exhibit.id && this.state.bookings[i].date === date)
                    {
                        id = this.state.bookings[i].id;
                        userData[id] = null;
                        userNrBookings=userNrBookings-1;

                    }
                    if(this.state.bookings[i].uid == auth.currentUser.uid  && this.state.exhibit.id === this.state.bookings[i].exhibitId)
                    {

                        userNrBookings=userNrBookings+1;

                    }

                }
            });
        }
        catch(e){
            console.log(e)
        }

        console.log(userNrBookings)

        if (status)
        {
            if(userNrBookings>=maxBookingsPerAcc)
            {
                Alert.alert(
                    'BOOKING ERROR',
                    'You have exceeded maximum bookings for an user per a collection.',
                    [
                        {
                            text: 'Go to notifications',
                            onPress: () => this.props.navigation.navigate('NotificationScreen')
                        },

                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );

                return;
            }

            if( value.maxSpots<=0)
            {
                Alert.alert(
                    'BOOKING ERROR',
                    'There are no spots available for that hour',
                    [
                        {
                            text: 'Go to notifications',
                            onPress: () => console.log('Ask me later pressed')
                        },

                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );

                return;
            }

             let booking = {
                id: id,
                uid: uid,
                exhibitId: this.state.exhibit.id,
                date: date,
                hour: value.hourKey,

            };
            userData[id] = booking;




            await this.sendPushNotification();

        }
        else
        {
            userData[id] = null;

        }


       await database.ref('bookings').update(userData);

        this.makeRequest();

    }
    render() {

        let _this = this;
        const slots = this.state.hourAvailability;




        const slotsArray = Object.keys(slots).map( function(k) {
            return (  <View key={k} style={{margin:1}}>
                <BookingButton countCheck={0} onColor={"green"} _onPress={(status) => _this._bookSlot(status,k,slots[k]) } text={slots[k].hourSlot  +'     Available spots: '+ slots[k].maxSpots} />
            </View>)
        });
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>

                { slotsArray }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});