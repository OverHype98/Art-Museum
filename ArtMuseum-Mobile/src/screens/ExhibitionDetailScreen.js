import React, { Component } from 'react';
import {View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import {f, auth, database} from '../../config/firebase';
import {SearchBar} from "react-native-elements";
import {ArtObjectCard} from "../components/ArtObjectCard";
import MenuImage from "../components/MenuImage";






export default class ExhibitionDetailScreen extends Component{

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: () =>
                <MenuImage
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
            ,
            headerTitle: () =>
                <SearchBar
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomColor: 'transparent',
                        borderTopColor: 'transparent',
                        flex: 1
                    }}
                    inputContainerStyle={{
                        backgroundColor: '#EDEDED'
                    }}
                    inputStyle={{
                        backgroundColor: '#EDEDED',
                        borderRadius: 10,
                        color: 'black'
                    }}
                    searchIcond
                    clearIcon
                    //lightTheme

                    round
                    onChangeText={text => params.SearchFilterFunction(text)}
                    onClear={() => params.SearchFilterFunction('')}
                    placeholder="Type something here...."
                    value={params.data}
                />

        };
    };



    constructor(props)
    {
        super(props);
        this.state = {
            exhibit: props.navigation.state.params.exhibit,
            objectIds: [],
            objects: [],
            search: '',
            isLoading:true
        };

        this.extraData = [];

    }

    getObject = (objId) => {

        const ref = database.ref('object').child(objId);


        ref.once('value').then((snapshot) => {
            let object =  snapshot.val();

            object["id"] = objId;

            this.state.objects.push(object);

        });
    }

    getArray = (arrObj) => {

        for (let i = 0; i < arrObj; i++) {

            this.getObject(this.state.objectIds[i])
        }
    }

    getData = () => {

        database.ref(`exhibition_object/${this.state.exhibit.id}`).once('value')
            .then((snapshot) => {
                this.setState({
                    objectIds: Object.keys(snapshot.val())

                })


                this.getArray(this.state.objectIds.length)

                this.extraData = this.state.objects;



                this.setState({
                    isLoading: false
                })

            }).catch(error => {
            console.error(error);
        });
    }

    clear = () => {
        this.search.clear();
    };

    SearchFilterFunction = text => {

        const newData = this.extraData.filter(function(item) {

            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            objects: newData,
            search: text,
        });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.3,
                    width: '100%',
                    backgroundColor: '#080808',
                }}
            />
        );
    };




    componentDidMount () {

        const { navigation } = this.props;
        this.getData();
        navigation.setParams({
            SearchFilterFunction: this.SearchFilterFunction,
            data: this.getValue
        });

    }


    getValue = () => {
        return this.state.search;
    };

    keyExtractor = (item, index) => {

        return item.id;
    }

    _onPressItem = (artObject) => {
        this.props.navigation.navigate('ArtObjectScreen',{
            artObject: artObject   //artObject info
        })

    };


    renderItem = ({item, index}) => {



        return (
            <View>

                <TouchableOpacity onPress={() => this._onPressItem(item)}>
                    <ArtObjectCard
                        image={{uri:item.image}}
                    />
                </TouchableOpacity>

            </View>
        );
    }




    render(){

        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        const { search } = this.state;
        return (

            <View style={{flex: 1}}>

                <FlatList

                    data={this.state.objects}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    enableEmptySections={true}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}


                />
            </View>
        );
    }
}

