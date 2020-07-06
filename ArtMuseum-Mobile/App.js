import React, { Component } from 'react';
import AppContainer from "./navigation/index";
import UserProvider from "./config/context";
import OfflineNotice from "./src/screens/OfflineNotice"


export default class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }
    render() {
        return (
            <UserProvider>
                <AppContainer />
                <OfflineNotice/>
            </UserProvider>
        );
    }
}
