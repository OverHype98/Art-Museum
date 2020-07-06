import React from 'react';
import { TouchableHighlight, Image, Text, View,StyleSheet } from 'react-native';
import PropTypes from 'prop-types';


export default class BackButton extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress} style={styles.btnContainer}>
                <Image source={require('../../assets/icons/backArrow.png')} style={styles.btnIcon} />
            </TouchableHighlight>
        );
    }
}

BackButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string
};


const styles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 180,
        padding: 8,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    btnIcon: {
        height: 17,
        width: 17
    }
});
