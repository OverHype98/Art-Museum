import React ,{ Component } from 'react';
import { database } from '../../config/firebase';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, Alert, TextInput
} from 'react-native';
import { UserContext } from '../../config/context';
import BackButton from "../components/BackButton";
import * as ImagePicker from "expo-image-picker";


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dl3c9568n/upload';

class Profile extends Component{

    _isMounted = false;

    static navigationOptions = ({ navigation }) => {

        return {
            title: '',
            headerTransparent: 'true',
            headerLeft: () =>
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />


        };
    };
    constructor(props) {
        super(props);
        this.state = {
            User: '',
            firstName: '',
            lastName: '',
            photoUrl: '',
        };
    }



    static contextType = UserContext

    componentDidMount() {
        this._isMounted = true;
        const userContext = this.context

        this.setState({ User: userContext.state.User })

        console.log();



    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });

        if (pickerResult.cancelled === true) {
            return;
        }


        let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

        let data = {
            "file": base64Img,
            "upload_preset": "dl3c9568n",
        }

        fetch(CLOUDINARY_URL, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }).then(async r => {
            let data = await r.json()

            console.log(data.secure_url)
            this.setState({
                photoUrl: data.secure_url,

            });
        }).catch(err => console.log(err))

        console.log(this.state.photoUrl)

    };

    updateProfile() {

        if(this.state.firstName == '')
        {
            this.setState({
                firstName: this.state.User.firstName
            })
        }

        if(this.state.lastName == '')
        {
            this.setState({
                lastName: this.state.User.lastName
            })
        }

        if(this.state.photoUrl == '')
        {
            this.setState({
                photoUrl: this.state.User.avatar
            })
        }


        database.ref('/users/' + this.state.User.uid).update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            avatar: this.state.photoUrl
        })

        const userContext = this.context
        userContext.setUser(this.state.firstName,this.state.lastName,this.state.photoUrl);

        this.setState({User: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            avatar: this.state.photoUrl,
            } })

        this.props.navigation.navigate('ProfileScreen');

    }


    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    createTwoButtonAlert = () =>
        Alert.alert(
            "Warning",
            "Are you sure you want to save changes?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.updateProfile() }
            ],
            { cancelable: false }
        );



    render(){

        return (

                        <View style={styles.container}>

                            <View style={styles.header}></View>
                            <TouchableOpacity style={styles.upload} onPress={() => this.openImagePickerAsync()}>
                                <Image style={styles.avatar} source={{uri: this.state.User.avatar}}/>
                            </TouchableOpacity>
                            <View style={styles.body}>
                                <View style={styles.bodyContent}>
                                    <Text style={styles.firstNameLabel}>First Name</Text>
                                    <TextInput style={styles.firstName}
                                        placeholder={this.state.User.firstName}
                                        value={this.state.firstName}
                                        onChangeText={(text) => this.updateTextInput(text, 'firstName')}
                                    />
                                    <Text style={styles.lastNameLabel}>Last Name</Text>
                                    <TextInput style={styles.lastName}
                                               placeholder={this.state.User.lastName}
                                               value={this.state.lastName}
                                               onChangeText={(text) => this.updateTextInput(text, 'lastName')}
                                    />


                                    <TouchableOpacity style={styles.saveContainer} onPress={() => this.createTwoButtonAlert()}>
                                        <Text>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
        );
    }
}
const styles = StyleSheet.create({
    header:{
        backgroundColor: "#1d2226",
        height:150,
    },
    upload: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "green",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:100
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "green",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:-3
    },
    name:{
        fontSize:22,
        color:"#001c26",
        fontWeight:'600',
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
    },
    firstName: {
        marginTop:70,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#89bdff",
        textAlign:"center"

    },
    lastName: {
        marginTop:20,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#89bdff",
        textAlign:"center"

    },
    saveContainer: {
        marginTop:20,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#89bdff",

    },
    firstNameLabel: {

        position: 'absolute',
        height:100,
        marginTop:70,

    },
    lastNameLabel: {

        position: 'absolute',
        height:100,
        marginTop:160,

    },
});

export default Profile;