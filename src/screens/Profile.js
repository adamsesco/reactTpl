import React, { Component } from 'react';
import { View, Text, Button, NativeModules } from 'react-native';
import HeaderTpl from '../components/Header';
import {Container, Content, ListItem, List} from 'native-base';
import {Logout} from '../actions/LoginAction';
import { connect } from 'react-redux';
import firebase from 'firebase';


class Profile extends Component {

    constructor(props) {
        super(props);
        // this.fire();

        this.state = {
          dataFrom: {
            email: 'my email'
          }
        };
      }


    fire = () => {

        var config = {
            apiKey: "AIzaSyDLLccBRrVg7gmO95AXH7mF3OJl9ttx9ao",
            authDomain: "my-new-test-ba7fd.firebaseapp.com",
            databaseURL: "https://my-new-test-ba7fd.firebaseio.com",
            projectId: "my-new-test-ba7fd",
            storageBucket: "my-new-test-ba7fd.appspot.com",
            messagingSenderId: "835529359676"
          };

         firebase.initializeApp(config); 

    }

    componentWillMount(){

    //   self = this;

    //   firebase.database().ref('UsersList').limitToLast(1).on('value', (data) => {

       
    //     data.forEach(function(child){

    //       self.setState({dataFrom: child.val()})
          

    //     })

    // })

    }

    makeNew = () => {
      firebase.database().ref('UsersList').push({
        email: 'farwaniyahclub@gmail.com',
        username: 'ds',
        phone: 2881721
      })

    }


 	static navigationOptions = {
		header: null,
		};


  logoutAuth = () =>{
    this.props.navigation.navigate("Login");
    this.props.Logout();

  }

  render() {

    const {username, phone, code} =  this.props.data.data ? this.props.data.data : '';


    return (


     <Container>
        <HeaderTpl title="Profile" returned navigation={this.props.navigation} />	
 

        <Content>
          <List>
            <ListItem>
              <Text>Username: {username}</Text>
            </ListItem>
            <ListItem>
              <Text>Phone : {phone}</Text>
            </ListItem>
            <ListItem>
              <Text>Verification code :{code} </Text>
            </ListItem>
          </List>


          <Button title="Logout" onPress={() => this.logoutAuth()} style={{backgroundColor: 'orange', color: '#fff'}} />


        </Content>

    </Container>
    );
  }
}

const mapStatetoProps = ({loginAction, Logout}) =>{

    return{

        data: loginAction.data


    }

}


export default connect(mapStatetoProps, {Logout})(Profile);