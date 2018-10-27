import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Results extends Component {
    
  static navigationOptions = {

    header: null
    
  }  

  constructor(props) {
    super(props);
    this.state = {

        results: ''
    };
  }

  getDataRace = async() => {

    const link = "https://www.farwaniyahclub.com/voting/?page=getRaceRecord&id="+this.props.navigation.getParam("data").id;

    const {data} = await axios.get(link);

    this.setState({results: data})

    console.log(this.state.results);

  }


  componentDidMount(){

    this.getDataRace();


  }

  render() {

    const {results} = this.state; 


    return (
      <View style={{flex: 1}}>
            <View style={{backgroundColor: '#101329', padding:29, paddingTop: 60, height:120, flexDirection: 'row'}}>

                <View><TouchableOpacity onPress={() => this.props.navigation.navigate("MyRaces")} style={{width: 30, justifyContent: 'center', alignContent:'center', height: 40}}><Icon type="ionicon" name="ios-arrow-back" size={29} color="#fff" /></TouchableOpacity></View>
                <View>
                <Text style={{color: '#fff'}}>Jockey Name</Text>
                <Text style={{color: "#fff", fontSize: 20, fontWeight: 'bold'}}>1:22:23</Text>
                </View>
                

            </View>

            <View style={{flex: 1, padding:22, backgroundColor: "#fff", minHeight: 300}}>
            
            
            <FlatList
          data={results}
          renderItem={({item, index}) =>

          <View style={{backgroundColor: '#f8f8f8', marginBottom: 10, flexDirection: 'row', borderRadius: 20}}>

          <View><Text style={{fontSize: 16, textAlign: 'center', borderRadius: 3, fontWeight: 'bold', padding: 10}}>{index + 1}</Text></View>

            <View style={{width: "28%", borderRadius: 20, padding:10, backgroundColor: '#C3306D'}}><Text style={{fontWeight: 'bold', color: '#fff', textAlign: 'center'}}>{item.distance}</Text> </View>
            <View style={{padding:10, width: "62%"}}><Text style={{fontWeight: 'bold', color: '#C3306D', fontSize: 20, textAlign: 'center'}}>{item.timer}</Text> </View>


          </View>

          }
          keyExtractor={({id}) => id}
        />

       </View>
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
