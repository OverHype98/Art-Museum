import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator, StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { auth, database} from '../../config/firebase';


const COLORS = {
  WHITE: '#FFF',
  BLACK: '#000',
  BLUE: '#69B1D6',
  ORANGE: '#fe6d2b',
  LIGHT_BLUE: '#30cefd',
  DARK_BLUE: '#002f37',
  DARK_GREY: '#0a5146',

};
const SIZES = {
  BASE: 6,
  FONT: 12,
  TITLE: 24,
  SUBTITLE: 11,
  LABEL: 12,
  PADDING: 12,
};



export default class SignupScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  _isMounted = false;

  constructor(props)
  {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      confirmPass: '',
    };


  }

  openSignin = () => {
    this.props.navigation.navigate('Signin');
  };

  createUserObj = (userObj, email) => {

    let uObj = {
      firstName: 'First Name',
      lastName: 'Last name',
      avatar: 'https://res.cloudinary.com/dl3c9568n/image/upload/v1591808271/blank-profile-picture-973460_960_720_mfcfwa.webp',
      email: email,
      role: 'user'

    };
    database.ref('users').child(userObj.uid).set(uObj);
  }


  componentDidMount = () => {

    StatusBar.setHidden(true);
    this._isMounted = true;

  };

  componentWillUnmount() {
    this._isMounted = false;
  }

    registerUser = async (email, password,confirmPass) => {

    this.setState({ loading: true })

    if(password == confirmPass)
    {

      try{
        await auth.createUserWithEmailAndPassword(email,password)
            .then((userObj) => this.createUserObj(userObj.user, email))
            .catch((error) => alert(error));

        this.props.navigation.navigate('Exhibitions');

      } catch(error){
        alert(error);

      }

    }else
    {
      alert(`Passwords do not match`);
    }

      this.setState({ loading: false })

  }


  renderInputs() {
    const { email, password, loading, confirmPass } = this.state;
    const isValid = email && password;

    return (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
                value={email}
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={COLORS.DARK_GREY}
                onChangeText={value => this.setState({ email: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
                secureTextEntry
                value={password}
                style={styles.input}
                placeholderTextColor={COLORS.DARK_GREY}
                onChangeText={value => this.setState({ password: value })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                secureTextEntry
                value={confirmPass}
                style={styles.input}
                placeholderTextColor={COLORS.DARK_GREY}
                onChangeText={value => this.setState({ confirmPass: value })}
            />
          </View>
          <TouchableOpacity
              disabled={!isValid}
              style={{ marginTop: SIZES.PADDING * 1.5 }}
              onPress={() => this.registerUser(this.state.email,this.state.password,this.state.confirmPass)}>
            <LinearGradient
                style={[styles.button, styles.signin]}
                colors={isValid ? [COLORS.ORANGE, COLORS.LIGHT_BLUE] : [COLORS.DARK_BLUE, COLORS.DARK_GREY]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}>
              {loading ? (
                  <ActivityIndicator size={SIZES.FONT * 1.4} color={COLORS.WHITE} />
              ) : (
                  <Text
                      style={{
                        fontWeight: '500',
                        letterSpacing: 0.5,
                        color: COLORS.WHITE,
                        backgroundColor: 'transparent',
                      }}>
                    SignUp!
                  </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </>
    );
  }


  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={{ marginBottom: 18 }}>
              <Text style={styles.title}>Sign up</Text>
              <Text style={styles.subtitle}>Please sign up to get full access</Text>
            </View>
            <View style={{ flex: 2 }}>
              {this.renderInputs()}
            </View>
            <View style={{ flex: 0.25, alignItems: 'center' }}>
              <Text
                  style={{
                    fontSize: SIZES.FONT,
                    color: COLORS.DARK_GREY,
                    marginBottom: SIZES.BASE,
                  }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => this.openSignin()}>
                <Text
                    style={{
                      fontSize: SIZES.FONT,
                      fontWeight: '600',
                      color: COLORS.DARK_GREY,
                    }}>
                  Signin!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: SIZES.BASE,
    justifyContent: 'center',
    padding: SIZES.PADDING / 0.83,
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.PADDING,
    paddingVertical: SIZES.PADDING * 2,
  },
  input: {
    borderColor: COLORS.DARK_GREY,
    borderRadius: SIZES.BASE,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: SIZES.FONT,
    padding: SIZES.PADDING * 1.5,
  },
  inputContainer: {
    marginBottom: SIZES.PADDING,
  },
  label: {
    color: COLORS.DARK_GREY,
    fontSize: SIZES.FONT,
    marginBottom: SIZES.BASE,
  },
  signin: {
    paddingVertical: SIZES.PADDING * 1.5,
  },
  subtitle: {
    color: COLORS.DARK_GREY,
    fontSize: SIZES.SUBTITLE,
  },
  title: {
    fontSize: SIZES.TITLE,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: SIZES.BASE,
  },
});






