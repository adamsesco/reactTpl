import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {LinearGradient} from 'expo';
import { Input, InputGroup } from 'native-base';

class Login extends Component {

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
        <LinearGradient  colors={['#4c669f', '#3b5998', '#192f6a']} style={{flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#fff"}}>
               Sign In
              </Text>
        <InputGroup style={{width: 300}}>
        
          <Input placeholder="USERNAME" style={{fontSize: 12, color: "#FFF", fontWeight: "bold"}}/>

        </InputGroup>
        </LinearGradient>
            </View>   

         
    );
  }
}
export default Login;