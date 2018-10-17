import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';

import HeaderTpl from '../components/Header';
import { Button, Icon } from 'react-native-elements';

class AddJockey extends Component {

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

			  <HeaderTpl title="Add new jockey" returned navigation={this.props.navigation} />	




          <View style={{padding: 10, flex: 2}}>

          <View style={{ borderLeftWidth: 3, borderLeftColor: '#aaa', padding: 10, margin: 10}}>
              <Text style={{fontSize: 12, color: '#aaa'}}>Please note that you are the only persone who will track the jockey</Text>
            </View>

            <TextInput placeholder="Jockey username" style={{padding:10, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',  margin: 10}} />

            <TextInput keyboardType="phone-pad" placeholder="Code" style={{padding:10, borderRadius: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', margin: 10}} />

            <Button title="Add jockey" rounded backgroundColor="#CA2C3F" />
          
          </View>

            <View style={{ borderTopWidth: 1, borderColor: '#CA2C3F', padding: 10, margin: 10}}>
              
              <Text style={{fontSize: 12, color: '#CA2C3F', alignSelf: 'center'}}>Please note that you are the only persone who will track the jockey</Text>

            </View>


      </View>
    );
  }
}

export default AddJockey;
