import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Header, Icon, Button} from 'react-native-elements';

class HeaderTpl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){

  }


leftButton = () => {
  
      
    if(this.props.returned){

      return <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeTwo")} style={{marginTop: 15}}><Icon type="ionicon" name="ios-arrow-back" size={29} color="#fff" /></TouchableOpacity>;

    }

    return <TouchableHighlight style={{marginTop: 15}}><Icon type="ionicon" name="ios-menu" size={29} color="#fff" /></TouchableHighlight>;


  }


  
  render() {



    return (

        <Header height={{height: 150}}>

            <View>{this.leftButton()}</View>
            <View><Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.title}</Text></View>
            <View><TouchableHighlight style={{marginTop: 15}} onPress={() => this.props.navigation.navigate("Profile")}><Icon type="ionicon" name="ios-contact" size={29} color="#fff" /></TouchableHighlight></View>

        </Header>




    );
  }
}

export default HeaderTpl;
