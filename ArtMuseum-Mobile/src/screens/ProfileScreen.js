import React ,{ Component } from 'react';
import {auth, database} from '../../config/firebase';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, Alert
} from 'react-native';
import { UserContext } from '../../config/context';
import MenuImage from "../components/MenuImage";

import {NavigationEvents} from 'react-navigation';



class Profile extends Component{

  _isMounted = false;



  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',

    headerLeft: () =>
        <MenuImage
            onPress={() => {
              navigation.openDrawer();
            }}
        />

  });
  constructor(props) {
    super(props);
    this.state = {
      User: '',
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    this._isMounted = true;
    this.makeRequest()
  }

  makeRequest() {

    const userContext = this.context;

    this.setState({ User: userContext.state.User })

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  openLogin = () => {
    this.props.navigation.navigate('Signin');
  };

  openEdit = () => {
    this.props.navigation.navigate('ProfileEditScreen');
  };

  openNotifications = () => {
    this.props.navigation.navigate('NotificationScreen');
  };


   createTwoButtonAlert = () =>
      Alert.alert(
          "Warning",
          "Are you sure you want to logout?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => this.signUserOut() }
          ],
          { cancelable: false }
      );


  signUserOut = async () => {
    try {
      await auth.signOut();
      this.openLogin();
    } catch (e) {
      console.log(e);
    }


  };


  render(){



    return (

            <View style={styles.container}>

              <View style={styles.header}></View>

              <Image style={styles.avatar} source={{uri: this.state.User.avatar}}/>

              <View style={styles.body}>
                <View style={styles.bodyContent}>




                  <TouchableOpacity style={styles.profileContainer} onPress={() => this.openEdit()}>
                    <Text>Profile Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoutContainer} onPress={() => this.openNotifications()}>
                    <Text>Notifications</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.logoutContainer} onPress={() => this.createTwoButtonAlert()}>
                    <Text>Logout</Text>
                  </TouchableOpacity>

                </View>
              </View>
              <NavigationEvents onDidFocus={() => this.makeRequest()} />
            </View>

    );
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#1d2226",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:100
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
  profileContainer: {
    marginTop:70,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#89bdff",

  },
  logoutContainer: {
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
});

export default Profile;