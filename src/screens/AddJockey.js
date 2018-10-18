import React, { Component } from 'react';
import { View, Text, TextInput, ActivityIndicator} from 'react-native';

import HeaderTpl from '../components/Header';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import axios from 'axios';

class AddJockey extends Component {

  static navigationOptions = {
		header: null,
    };

  constructor(props) {
    super(props);
    this.state = {

      username: '',
      code: '',
      loading: false
    };
  }

  AddDevice = async() => {


    const {username, code} = this.state;

    if(username == '' || code == ''){

      alert("Please fill bellow");
    }

    else{

      this.setState({loading: true});

      const url = 'https://www.farwaniyahclub.com/voting/?page=connectPhone';

      const {data} = await axios.post(url, {
        username,
        code,
        id: this.props.data.data.id
      });
      
      this.setState({loading: false});

     if(data.vere == 'success'){

        alert("Jockey has been added successfuly");
        this.props.navigation.navigate("HomeTwo", {restart: 'restart'});

     }

     else{

      alert("Error: Please Verify your informations");

     }


    }


  }

  isLoading = () => {
    if(this.state.loading){
      return <ActivityIndicator size="large" color="#111" style={{margin: 20}} />;

    }
  }



  render() {
    return (
      <View style={{flex: 1}}>

			  <HeaderTpl title="Add new Device" returned navigation={this.props.navigation} />	




          <View style={{padding: 10, flex: 2}}>

          <View style={{ borderLeftWidth: 3, borderLeftColor: '#aaa', padding: 10, margin: 10}}>
              <Text style={{fontSize: 12, color: '#aaa'}}>Please note that you are the only persone who will track the jockey</Text>
            </View>

            <TextInput placeholder="username"  onChangeText={(username) => this.setState({username})} style={{padding:10, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',  margin: 10}} />

            <TextInput keyboardType="phone-pad"   onChangeText={(code) => this.setState({code})} placeholder="Code" style={{padding:10, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', margin: 10}} />

            {this.isLoading()}

            <Button title="Add Device" rounded backgroundColor="#CA2C3F" onPress={() => this.AddDevice()} />
          
          </View>

            <View style={{ borderTopWidth: 1, borderColor: '#CA2C3F', padding: 10, margin: 10}}>
              
              <Text style={{fontSize: 12, color: '#CA2C3F', alignSelf: 'center'}}>Please note that you are the only persone who will track the jockey</Text>

            </View>


      </View>
    );
  }
}

const mapStatetoPros = ({loginAction}) => {
  return {
    data: loginAction.data
  }
}

export default connect(mapStatetoPros)(AddJockey);
