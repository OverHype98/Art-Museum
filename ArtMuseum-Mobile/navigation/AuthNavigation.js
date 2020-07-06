import { createStackNavigator } from "react-navigation-stack";
import SigninScreen from '../src/screens/SigninScreen';
import SignupScreen from '../src/screens/SignupScreen';


const AuthNavigation = createStackNavigator(
    {
        Signin: { screen: SigninScreen },
        Signup: { screen: SignupScreen }

    },
    {
        initialRouteName: "Signin",
        headerShown: "false"
    }
);

export default AuthNavigation;