import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';

class Results extends Component {
    
  static navigationOptions = {
    
    
    
  }  

  constructor(props) {
    super(props);
    this.state = {

        results: ''
    };
  }

  getMyRaces(){

    firebase.database().ref("/Results/"+this.props.data.data.id)
    .on('value', (data) => {
            
        this.setState({results: data});
    })

  }

  componentDidMount(){

      this.getMyRaces();

  }

  render() {
    return (
      <View>
        <Text> Results </Text>
      </View>
    );
  }
}

const mapStateToProps = ({loginAction}) =>{

    return {
        data: loginAction.data
    }

}

export default connect(mapStateToProps)(Results);
