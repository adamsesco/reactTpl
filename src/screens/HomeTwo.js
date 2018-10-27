import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';

import { Button, Icon} from 'react-native-elements';

import HeaderTpl from '../components/Header';

import {connect} from 'react-redux';

import axios from 'axios';

import * as Animatable from 'react-native-animatable';

class HomeTwo extends Component {

  static navigationOptions = {
		header: null,
    };

  constructor(props) {
    super(props);
    this.state = {
      jockies: '',
      loading: false
    };
  }


  getJockies = async() => {


    this.setState({loading: true});

    let userid = this.props.data.data.id;

    const url = `https://www.farwaniyahclub.com/voting/?page=getJockies&userid=${userid}`;

    const {data} = await axios.get(url);

    this.setState({loading: false});

    this.setState({jockies: data});
    

}

componentWillReceiveProps(){

  this.getJockies();

}

getDate(){

var date, month, year;
 date = new Date().getDate();
 month = new Date().getMonth() + 1;
 year = new Date().getFullYear();

 return date + "-" +  month + "-" + year;

}

componentDidMount(){

  console.log(this.getDate());

  this.getJockies();

}

  getData = () => {

    if(this.state.loading){

      return (        
          <View style={{flex: 1, padding: 80, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}><Text>loading...</Text></View>
      )
      

    }

   if(this.state.jockies.length > 0){


    const {jockies} = this.state; 


      return (

        <View style={{flex: 1}}>

          <Text style={{fontSize: 16, padding:20, textAlign:'center', fontWeight: 'bold'}}>Jockies List</Text>
          
          <FlatList
          data={jockies}
          renderItem={({key, item}) => 

          <Animatable.View duration={500 + (key * 20)} animation="slideInLeft">
          
          <TouchableOpacity onPress={()=> this.props.navigation.navigate("Start", {jockeyData: item})} style={{backgroundColor: '#fff', padding: 10, margin: 10, borderRadius: 5, shadowColor: '#000',shadowOffset: {width: 0, height: 2},  shadowOpacity: 0.2, alignContent: 'space-between', justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>

            <View><Icon type="ionicon" name="ios-contact" size={58} color="#6A7FF5" /></View>
            <View><Text style={{padding: 20, fontWeight: 'bold'}}>{item.username}</Text></View>
            <View><Text style={{padding: 22, textAlign:'right',fontWeight: 'bold', fontSize:11, color: 'red'}}>Offline</Text></View>


          </TouchableOpacity>

          </Animatable.View>

          }
          keyExtractor={({id}) => id}
        />

        <Button title="Add new jockey" containerViewStyle={{margin: 10, padding: 10}} rounded backgroundColor="#FF5126" onPress={() => this.props.navigation.navigate("AddJockey")} />


        </View>

      )
      


   }
   else{

  

    return (
    
    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
    
      <Text style={{fontSize: 12, color: '#aaa', fontWeight: 'bold'}}>You didnt Add jockies!</Text> 

       <Button title="Connect Phone" containerViewStyle={{margin: 10, padding: 10}} rounded backgroundColor="#FF5126" onPress={() => this.props.navigation.navigate("AddJockey")} />

       <View style={{borderTopColor: '#ddd', borderTopWidth: 1, padding: 10}}>

         <Text style={{fontSize: 12, color: '#aaa', fontWeight: 'bold', textAlign: "center"}}>If you're a jockey</Text>

          <Button title="Let's train" containerViewStyle={{margin: 10, padding: 10}} rounded backgroundColor="#1B9CE2" onPress={() => this.props.navigation.navigate("Track")} />


        </View>
    </View>)
  
    
   }



}
 


  render() {
    return (
      <View style={{flex: 1}}>

			  <HeaderTpl title="Farwaniyah Equiestrian Club" navigation={this.props.navigation} />	

          <View style={{padding: 10, flex: 1}}>


            {this.getData()}
          
          
          </View>


      </View>
    );
  }
}

const mapStatetoProps = ({loginAction})  =>{

  return{
    data: loginAction.data
  }

}

export default connect(mapStatetoProps)(HomeTwo);
