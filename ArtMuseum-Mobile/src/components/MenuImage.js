import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class MenuImage extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
                <Image
                    style={styles.headerButtonImage}
                    source={require('../../assets/icons/menu.png')}
                />
            </TouchableOpacity>
        );
    }
}

MenuImage.propTypes = {
    onPress: PropTypes.func
};

const styles = StyleSheet.create({
    headerButtonContainer: {
        padding: 10
    },
    headerButtonImage: {
        justifyContent: 'center',
        width: 25,
        height: 25,
        margin: 6
    }
});
