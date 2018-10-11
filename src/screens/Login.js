import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';
import {LinearGradient} from 'expo';
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
              <Text style={{color: "#fff", fontSize: 19}}>
               SIGN IN
              </Text>
        <View style={{width: 300}}>

            <TextInput placeholder="USERNAME" style={{fontSize: 12, color: "#FFF", fontWeight: "bold", padding: 16, margin: 10, borderWidth: 1, borderRadius: 13, borderColor: '#eee'}}/>

            <TextInput placeholder="PASSWORD" secureTextEntry style={{fontSize: 12, color: "#FFF", fontWeight: "bold", padding: 16, margin: 10, borderRadius: 13, borderWidth: 1, borderColor: '#eee'}}/>


        </View>
        </LinearGradient>
            </View>   

         
    );
  }
}
export default Login;