import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';
import firebae from 'firebase';
import * as Animatable from 'react-native-animatable';
import  { Icon } from 'react-native-elements';

class MyRaces extends Component {

    static navigationOptions = {
		header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            racesCount: 0,
            races: {jockey_id: 1},
            loading: true
        };
      }
    

    
    getDate(){

        var date, month, year;
         date = new Date().getDate();
         month = new Date().getMonth() + 1;
         year = new Date().getFullYear();
        
         return date + "-" +  month + "-" + year;
        
        }

    getMyRaces = async() => {

        await firebae.database().ref("/Activities")
        .orderByChild("trainer_id").equalTo(this.props.data.data.id)
        .on("value", (results) =>{

                this.setState({races: results});


                this.setState({racesCount: results.numChildren()})

                const arrData = [];

                results.forEach(record => {

                    const newData = record.val();
                    newData.id = record.key;

                    arrData.push(newData);

                     this.setState({races: arrData});

                     this.setState({loading: false})

                })

        });

    }

    isLoading = () => {
        if(this.state.loading){
          return <ActivityIndicator size="large" color="#101329" style={{padding:40}} />;
    
        }
      }  
  componentDidMount(){

      this.getMyRaces();

  }

  render() {

    const ListItems = this.state.races;

    return (
      <View style={{flex: 1, position: 'relative'}}>
       <StatusBar
     barStyle="light-content"
   />

        <View style={{backgroundColor: '#101329', padding:29, paddingTop: 60, height:120}}>

            <Text style={{color: '#fff'}}>{this.getDate()}</Text>
            <Text style={{color: "#fff", fontSize: 20, fontWeight: 'bold'}}>MY RACES</Text>

        </View>

        {this.isLoading()}


            <ScrollView style={{flex: 1}}>
          
            <FlatList
          data={ListItems}
          renderItem={({item, index}) =>

          <Animatable.View duration={200} animation="slideInLeft">
          
          <TouchableOpacity onPress={()=> this.props.navigation.navigate("Results", {data: item})} style={{backgroundColor: '#fff', padding: 10, margin: 10, borderRadius: 5, shadowColor: '#000',shadowOffset: {width: 0, height: 2},  shadowOpacity: 0.2, alignContent: 'space-between', justifyContent: 'space-between', flexDirection: 'row', flex: 1}}>

            <View><Text style={{padding: 20, fontWeight: 'bold'}}>Race ({index+1})</Text></View>
            <View style={{padding:15}}><Icon name="ios-arrow-dropright" type="ionicon" size={28} color="#aaa"  /></View>


          </TouchableOpacity>

          </Animatable.View>

          }
          keyExtractor={({id}) => id}
        />

            </ScrollView>

          
          <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}  style={{ position: 'fixed', right: 20,  left: 20, width: 120, height:40, bottom: 30, borderRadius: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff'}} colors={['#dd264c', '#A12C8E']}>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeTwo")} > <Text style={{color: '#fff', fontWeight: 'bold'}}>Start</Text></TouchableOpacity>

        </LinearGradient>  

       
      </View>
    );
  }
}

const mapSatettoProps = ({loginAction}) => {

    return {
        data: loginAction.data
    }

}


export default connect(mapSatettoProps)(MyRaces);
