import React, { Component } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { database } from '../../config/firebase';
import {ExhibitCard} from "../components/ExhibitCard";
import MenuImage from "../components/MenuImage";


export default class ExhibitionListScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Home',

        headerLeft: () =>
            <MenuImage
                onPress={() => {
                    navigation.openDrawer();
                }}
            />

    });


  constructor (props) {

    super(props);

    StatusBar.setHidden(true);
    this.state = {
        dataSource: [],
    };
  }


  componentDidMount () {
    this.makeRequest();
  }

  makeRequest  = () => {

      const ref = database.ref('exhibition');

      ref.once('value').then((snapshot) => {
          this.setState({ dataSource: Object.values(snapshot.val()) });
      });

  };


    _onPressItem = (exhibit) => {
        this.props.navigation.navigate('ExhibitionDetailScreen',{
            exhibit: exhibit   //exhibit info
        })

    };

  _onPressBook = (exhibit) => {
      this.props.navigation.navigate('CalendarScreen',{
          exhibit: exhibit   //exhibit info
      })
  };

  renderItem = ({ item }) => {

    if (!item) {
      return null
    }

    return (
      <View >
          <ExhibitCard
              title={item.title}
              description={item.description}
              image={{uri: item.image}}
              buttonText={"VIEW DETAILS"}
              buttonColor={"#4383FF"}
              onClickButton={()=>{this._onPressItem(item)}}
              onClickBook = {() => {this._onPressBook(item)}}
          />

      </View>
    );
  };

  keyExtractor = (item, index) => {
    return index.toString();
  };


  render () {

    return (
     
      <View style={{flex: 1}}>

        <FlatList
          data={this.state.dataSource}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          
        />
      </View>
    );
  }
}

