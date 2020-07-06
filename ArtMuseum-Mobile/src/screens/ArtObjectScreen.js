import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import BackButton from '../components/BackButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class ArtObjectScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {

        return {
            title: '',
            headerTransparent: 'true',
            headerLeft: () =>
                <BackButton
                    onPress={() => {
                        navigation.goBack();
                    }}
                />


        };
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            artObject: props.navigation.state.params.artObject,
        };
    }

    render() {

        return (
            <ScrollView style={styles.container}>


                        <TouchableHighlight>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: this.state.artObject.image }} />
                            </View>
                        </TouchableHighlight>


                <View style={styles.infoArtContainer}>
                    <Text style={styles.objectTitle}>{this.state.artObject.title}</Text>
                    <View style={styles.infoContainer}>

                            <Text style={styles.classification}>{this.state.artObject.classification}</Text>

                    </View>

                    <View style={styles.infoContainer}>

                        <Text style={styles.artist}>Artist : {this.state.artObject.artist}  </Text>

                    </View>
                    <View style={styles.infoContainer}>

                        <Text style={styles.artistInfo}>Artist Info : {this.state.artObject.artistInfo}  </Text>
                    </View>
                    <View style={styles.infoContainer}>

                        <Text style={styles.date}>Dated : {this.state.artObject.date}  </Text>
                    </View>
                    <View style={styles.infoContainer}>

                        <Text style={styles.dimensions}>Dimensions : {this.state.artObject.dimensions}  </Text>
                    </View>
                    <View style={styles.infoContainer}>

                        <Text style={styles.medium}>Medium : {this.state.artObject.medium}  </Text>
                    </View>


                    <View style={styles.infoContainer}>

                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoDescription}>{this.state.artObject.description}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },

    image: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: 270
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        width: viewportWidth,
        height: 250
    },
    infoArtContainer: {
        flex: 1,
        margin: 25,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    artist: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    artistInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        top:10
    },
    date: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        top:20
    },
    dimensions: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
        top:25
    },
    medium: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 5,
        top:28
    },
    classification: {
        fontSize: 26,
        fontWeight: 'bold',
        margin: 10,
        color: '#2cd18a'
    },
    infoDescription: {
        textAlign: 'left',
        fontSize: 16,
        marginTop: 30,
        margin: 15
    },
    objectTitle: {
        fontSize: 28,
        margin: 10,
        fontWeight: 'bold',
        color: '#7094d1',
        textAlign: 'center',

    }
});