import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Header, Button} from 'react-native-elements';

class HeaderTpl extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (

        <Header style={{paddingTop: 140}}>

            <View></View>
            <View></View><Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.title}</Text>
            <View></View>

        </Header>


    );
  }
}

export default HeaderTpl;
