import ExhibitionListScreen from "../src/screens/ExhibitionListScreen";
import ProfileScreen from '../src/screens/ProfileScreen';
import ProfileEditScreen from '../src/screens/ProfileEditScreen';
import ExhibitionDetailScreen from "../src/screens/ExhibitionDetailScreen";
import DrawerContainer from "../src/screens/DrawerContainer";
import {createStackNavigator} from "react-navigation-stack";
import ArtObjectScreen from "../src/screens/ArtObjectScreen";
import { createDrawerNavigator } from 'react-navigation-drawer';
import CalendarScreen from "../src/screens/CalendarScreen";
import HourSlotScreen from "../src/screens/HourSlotScreen";
import NotificationScreen from "../src/screens/NotificationScreen";



const ProfileNavigation = createStackNavigator(
    {
        ProfileScreen: { screen: ProfileScreen },
        ProfileEditScreen: { screen: ProfileEditScreen },
        NotificationScreen: { screen: NotificationScreen },


    },{
        initialRouteName: "ProfileScreen",
        headerShown: "false"
    }

);

    const BookNavigation = createStackNavigator(
        {
            CalendarScreen: { screen: CalendarScreen },
            HourSlotScreen: { screen: HourSlotScreen },
        }
    );

const ExhibitionNavigation = createStackNavigator(
    {
        ExhibitionListScreen: { screen: ExhibitionListScreen },
        ExhibitionDetailScreen: { screen: ExhibitionDetailScreen },
        ArtObjectScreen: { screen:ArtObjectScreen },
        BookNavigation: BookNavigation,
    },{
        initialRouteName: "ExhibitionListScreen",
        headerShown: "false"


    }
);


const AppNavigation = createDrawerNavigator(
    {
        Exhibitions: ExhibitionNavigation,
        ProfileScreen: ProfileNavigation ,


    },
    {
        drawerPosition: 'left',
        initialRouteName: 'Exhibitions',
        drawerWidth: 250,
        contentComponent: DrawerContainer
    }
);

export default AppNavigation;
