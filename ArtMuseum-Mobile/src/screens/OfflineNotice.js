import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet} from "react-native";
import NetInfo from "@react-native-community/netinfo";


const { width } = Dimensions.get('window');

export default class OfflineNotice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connectionInfo: true,
        };
    }

    componentDidMount(){

        NetInfo.addEventListener(state => {
            this.setState({
                connectionInfo: state.isConnected
            })
        });
    }



    render() {

        if( !this.state.connectionInfo ){
            return(
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>
                        No internet connection
                    </Text>
                </View>
            )
        } else{
            return null;
        }


    }

}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 0
    },
    offlineText: { color: '#fff' }
});