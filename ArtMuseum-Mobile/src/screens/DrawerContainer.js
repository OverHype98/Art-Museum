import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MenuButton from '../components/MenuButton';

export default class DrawerContainer extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.container}>
                    <MenuButton
                        title="HOME"

                        onPress={() => {
                            navigation.navigate('ExhibitionListScreen');
                            navigation.closeDrawer();
                        }}
                    />
                    <MenuButton
                        title="Profile"

                        onPress={() => {
                            navigation.navigate('ProfileScreen');
                            navigation.closeDrawer();
                        }}
                    />
                </View>
            </View>
        );
    }
}

DrawerContainer.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    })
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 20
    }
});