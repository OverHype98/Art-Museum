import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';

import {Calendar} from 'react-native-calendars';

export default class CalendarScreen extends Component {
    static navigationOptions = {
        headerShown: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            exhibit: props.navigation.state.params.exhibit,
        };
        this.onDayPress = this.onDayPress.bind(this);
    }
    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
        this.props.navigation.navigate('HourSlotScreen', { bookingDate : day, exhibit: this.state.exhibit })
    }



    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Calendar
                    onDayPress={this.onDayPress}
                    style={styles.calendar}
                    hideExtraDays
                    minDate
                    markedDates={{[this.state.selected]: {selected: true}}}
                    theme={{
                        selectedDayBackgroundColor: 'green',
                        todayTextColor: 'green',
                        arrowColor: 'green',
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 350
    }
});