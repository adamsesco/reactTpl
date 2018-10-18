import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {LinearGradient} from 'expo';
import { Button } from 'react-native-elements';
import {connect} from 'react-redux';


import {loginAction, Logout} from '../actions/LoginAction';

class Login extends Component {

  static navigationOptions = {
		header: null,
    };
    

  constructor(props) {
    super(props);
    this.state = {
      formAction: {
        username: '',
        password: ''
      },
      username: '',
      password: '',
      btnDisabled: true,
      message: 0
    };
  }

  checkIflogin = async() =>{


    if(this.props.data.data){

      if(this.props.data.data.token){

        await this.props.navigation.navigate("HomeTwo");

      }

   }

  }


  componentWillMount(){

    this.checkIflogin();

  }

  changeBtn(){
    if(this.state.username != '' && this.state.password != ''){

      this.setState({btnDisabled: false})

    }
    else{
      this.setState({btnDisabled: !false})

    }
    

  }

  login = async () => {

      const val = { username: this.state.username, password: this.state.password }


      const make = await this.props.loginAction(val);

      if(this.props.message == 2){
        alert("Please verify your informations");
      }
      if(this.props.data.data.token != null){

        const { navigate } = this.props.navigation;


        navigate('HomeTwo');

      }

  }


  isLoading = () => {
    if(this.props.loading){
      return <ActivityIndicator size="large" color="#fff" />;

    }
  }



  render() {

    return (

        <View style={{flex: 1}}>
        <LinearGradient  colors={['#1980B2', '#284D90', '#1980B2']} style={{flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
        <KeyboardAvoidingView behavior="padding">

        <Image source={require('../../assets/logo.png')} style={{height: 250, width: 320}} />

              <Text style={{color: "#fff", fontSize: 19, textAlign: 'center'}}>
               SIGN IN
              </Text>
        <View style={{width: 300}}>

            <TextInput placeholder="USERNAME" onChangeText={(username) => {this.setState({username}), this.changeBtn()}} style={{fontSize: 12, color: "#FFF", fontWeight: "bold", padding: 16, margin: 10, borderWidth: 1, borderRadius: 13, borderColor: '#eee'}}/>

            <TextInput placeholder="PASSWORD" onChangeText={(password) => {this.setState({password}), this.changeBtn()}} secureTextEntry style={{fontSize: 12, color: "#FFF", fontWeight: "bold", padding: 16, margin: 10, borderRadius: 13, borderWidth: 1, borderColor: '#eee'}}/>

            {this.isLoading()}


            <Button title="Login" disabled={this.state.btnDisabled} onPress={() => this.login()} buttonStyle={{ backgroundColor: "rgba(250, 250,250, .2)", height: 45, borderColor: "transparent", borderWidth: 0, borderRadius: 13}} />

            <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}><Text style={{color: '#fff',marginTop: 20, textAlign: 'center'}}>Dont have an account? Sign up</Text></TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </LinearGradient>
            </View>   

         
    );
  }
}

const mapStatetoProps = ({loginAction, Logout}) => {
	
	return {

    data: loginAction.data,
    message: loginAction.message,
    loading: loginAction.loading
	};
	
}

export default connect(mapStatetoProps, {loginAction, Logout})(Login);