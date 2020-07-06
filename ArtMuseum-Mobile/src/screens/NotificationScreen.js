import React ,{ Component } from 'react';
import {View, FlatList} from 'react-native';
import { auth, database} from '../../config/firebase';
import { Card } from "@paraboly/react-native-card";


class NotificationScreen extends Component{

    static navigationOptions = {
        title: 'Notifications',
    };

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            bookings: [],
            finalNotifications: [],
            hourSlots: [],
            exhibitions: [],
        };
    }

    componentDidMount() {
        this.makeRequest()

    }

    makeRequest(){
        let user = auth.currentUser;
        let userBookings = [];
        let finalNotifications = [];


        let ref = database.ref('hour_slots');

        ref.once('value').then(( snapshot) =>{
            this.setState({ hourSlots: snapshot.val() })

        });

        ref = database.ref('exhibition');
        ref.once('value').then(( snapshot) =>{
            this.setState({ exhibitions: snapshot.val() })

        });


        ref = database.ref('bookings');

        ref.once('value').then((snapshot) => {
            this.setState({ bookings: Object.values(snapshot.val())});

            for(let i = 0; i < this.state.bookings.length;i++)
            {
                if(this.state.bookings[i].uid === user.uid)
                {
                    let obj = this.state.bookings[i];
                    userBookings.push(obj);
                }
            }

            for(let i = 0; i < userBookings.length;i++)
            {
                let exhibit = this.state.exhibitions[userBookings[i].exhibitId];

                let hour = this.state.hourSlots[userBookings[i].hour];

                let notification = {
                    date: userBookings[i].date,
                    hour: hour,
                    exhibitTitle: exhibit.title,
                    exhibitDescription: exhibit.description,
                    exhibitImage: exhibit.image,
                };

                finalNotifications.push(notification)
            }

            this.setState({ finalNotifications: finalNotifications })


        });


    }

    keyExtractor = (item, index) => {
        return index.toString();
    };

    renderItem = ({  item }) => {

        if (!item) {
            return null
        }

        return (
            <View>

                <Card
                    iconDisable
                    title={ item.exhibitTitle }
                    iconName="home"
                    borderRadius={20}
                    topRightText={ item.hour }
                    bottomRightText={ item.date }
                    iconBackgroundColor="#fcd"
                    textContainerNumberOfLines={null}
                    content={ item.exhibitDescription }
                    topRightStyle={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: "#505e80"
                    }}
                    bottomRightStyle={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#505e80"
                    }}
                />


            </View>
        );
    };


    render() {
        return (

            <View>
                <FlatList
                    data={this.state.finalNotifications}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}


export default NotificationScreen;