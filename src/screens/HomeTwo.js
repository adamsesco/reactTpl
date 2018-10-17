import React, { Component } from 'react';
import { View, Text } from 'react-native';

import HeaderTpl from '../components/Header';
import { Container, Body, Content } from 'native-base';
import { Button } from 'react-native-elements';

class HomeTwo extends Component {

  static navigationOptions = {
		header: null,
    };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>

			  <HeaderTpl title="Farwaniyah Equiestrian Club" />	

          <View style={{padding: 10, flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>


             <Text style={{fontSize: 12, color: '#aaa', fontWeight: 'bold'}}>You didnt Add jockies!</Text>

             <Button title="Add new Jockey" containerViewStyle={{margin: 10, padding: 10}} rounded backgroundColor="#FF5126" onPress={() => this.props.navigation.navigate("AddJockey")} />

          
          
          </View>


      </View>
    );
  }
}

export default HomeTwo;
