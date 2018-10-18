import React, { Component } from 'react';
import { View, Text , ScrollView, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo';

class Signup extends Component {


  static navigationOptions = {
    header: null,
};


  constructor(props) {
    super(props);
    this.state = {

        username: '',
        password: '',
        type: '',
        phone: '',
        loading: false,
        disableButton: false

    };
  }

isLoading = () => {
    if(this.state.loading){
      return <ActivityIndicator size="large" color="#fff" />;

    }
  }

  SignUp = async() =>{

            

            const url = "https://www.farwaniyahclub.com/voting/?page=SignupApi";

            const form = this.state;

            if(form.username == '' || form.password == '' || form.phone == ''){
                alert("Please fill all requrirments fields")
            }
            else{
                this.setState({loading: true, disableButton: true});

                const conect = await axios.post(url, 
                    {
                    username: this.state.username,
                    password: this.state.password,
                    phone: this.state.phone
                }
            );

                console.log(conect.data);

                this.setState({loading: false, disableButton: false});

                this.props.navigation.navigate("Login");

            }

           


  }

  render() {

    return (

        <View style={{flex: 1}}>
        <LinearGradient  colors={['#1980B2', '#284D90', '#1980B2']} style={{flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
        <KeyboardAvoidingView behavior="padding">

        <Image source={require('../../assets/logo.png')} style={{height: 150, width: 170, alignSelf: 'center'}} />

              <Text style={{color: "#fff", fontSize: 19, textAlign: "center"}}>
               SIGN UP 
              </Text>
        <View style={{width: 300}}>


            <TextInput  enablesReturnKeyAutomatically autoCorrect={false} onChangeText={(username) => this.setState({username})} placeholder="USERNAME" style={{fontSize: 12, color: "#FFF", fontWeight: "bold", padding: 16, margin: 10, borderWidth: 1, borderRadius: 13, borderColor: '#eee'}}/>

            <TextInput enablesReturnKeyAutomatically onChangeText={(password) => this.setState({password})} placeholder="PASSWORD" secureTextEntry style={{fontSize: 12, color: "#FFF", fontWeight: "bold", padding: 16, margin: 10, borderRadius: 13, borderWidth: 1, borderColor: '#eee'}}/>

            <TextInput keyboardType="phone-pad" autoCorrect={false} onChangeText={(phone) => this.setState({phone})} placeholder="PHONE" numPad style={{fontSize: 12, color: "#FFF", fontWeight: "bold", padding: 16, margin: 10, borderRadius: 13, borderWidth: 1, borderColor: '#eee'}}/>

            {this.isLoading()}

            <Button disabled={this.state.disableButton} title="Sign up" onPress={() => this.SignUp()} buttonStyle={{ backgroundColor: "rgba(250, 250,250, .2)", height: 45, borderColor: "transparent", borderWidth: 0, borderRadius: 13}} />

            <TouchableOpacity onPress={() => this.props.navigation.goBack() }><Text style={{color: '#fff',marginTop: 20, textAlign: 'center'}}>Have an account? Sign in</Text></TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </LinearGradient>
            </View>   

         
    );

    const Styles = StyleSheet.create({

        activeType: {
            borderColor: "#ddd",
            backgroundColor: "#1980B2"
        },
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#00000040'
          },
          activityIndicatorWrapper: {
            backgroundColor: '#FFFFFF',
            height: 100,
            width: 100,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }
    
    })

    
  }
}


export default Signup;
