import React, { Component } from 'react';
import {Image, 
        View, Text , StyleSheet, TouchableOpacity, StatusBar, Modal, TouchableHighlight, 
        ScrollView, Dimensions} from 'react-native';
import {MapView} from 'expo';
import {Icon} from 'react-native-elements';
import moment, { invalid } from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Button } from 'native-base';

class Start extends Component {

  static navigationOptions = {
      header: null
  }  
  constructor(props) {
    super(props);
    this.state = {
        start: 0,
        now: 0,
        laps: [ ],
        isStart: false,
        initialCoords: {
            latitude: 0,
            longitude: 0,
        },
        distance: 0,
        timer: {
            mseconds: '00',
            seconds: '00',
            minutes: '00',
        },
        activity: null,
        modalVisible: true,
        savePresist: [],
        longitudeDela: 0.001,
        latitudeDelta: 0.001,
        userLocation: {
            latitude: 29.180613495855397,
            longitude: 47.81234649758561,
            speed: 0
        }

    };
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 25; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  


saveP(){

    const  initialarray = [];

    initialarray.push([1, 44]);
}

cehckDistanceType(){


    const polygon_finish = [ [ 29.18070348401055, 47.81234432086579 ], [ 29.180569220689122, 47.812130638229085 ],[ 29.18052862943695, 47.81216818915736 ],[ 29.1806691375904, 47.8123711429575 ],[29.180705825810705, 47.81234342680963]];

    const polygon_200 = [[29.181530697635623, 47.811572680213004], [29.181385533432504, 47.8113638069831],[29.181416445829257, 47.81133163051155],[29.181567100475945, 47.811538160624885],[29.181530697635623, 47.811572680213004]]

    if(this.insideP([this.state.userLocation.latitude, this.state.userLocation.longitude], 811572680213004)){

        self.setState({distance: 200});
        
        axios.post("https://www.farwaniyahclub.com/voting/?page=SaveRecord", {
            trainer_id: this.props.data.data.id,
            jockey_id: this.props.navigation.getParam("jockeyData").id,
            distance: 200,
            activity_id: this.state.activity.id,
            timer: this.state.timer.minutes + ":" + this.state.timer.seconds + ":" + this.state.timer.mseconds,
        })

       }

    if(this.insideP([this.state.userLocation.latitude, this.state.userLocation.longitude], polygon_200)){

        self.setState({distance: 'finish'});

        axios.post("https://www.farwaniyahclub.com/voting/?page=SaveRecord", {
            trainer_id: this.props.data.data.id,
            jockey_id: this.props.navigation.getParam("jockeyData").id,
            distance: 'Finish',
            activity_id: this.state.activity.id,
            timer: this.state.timer.minutes + ":" + this.state.timer.seconds + ":" + this.state.timer.mseconds,
        })

        this.Stop();

       }


}

showFinishModal(){

    if(this.state.distance == 'finish'){


    return (

                        <Modal
                        animationType="slide"
                        transparent={false}
                        duration={300}
                        >


                          <View style={{padding: 22, flex: 1, marginTop: 30}}>
                            <View style={{backgroundColor: "#fff", borderRadius: 5, padding: 20}}>
                            <Text style={{alignContent: "center", fontSize: 24, fontWeight: "bold", marginLeft: -20}}>Finish!</Text>
                            <View style={{flex: 1, alignContent:'center', justifyContent:'center', backgroundColor: '#eee'}}>

                            <Text style={{textAlign:'center', paddingVertical: 40, fontSize: 33, color:'red'}}> {this.state.timer.minutes} : {this.state.timer.seconds} : {this.state.timer.mseconds} </Text>
                            
                            </View>


                            </View>
                            <View style={{flex: 1, padding:20, backgroundColor: '#6578F9', bottom: 0, position: 'absolute', width: Dimensions.get("window").width}}>
                            
                                <TouchableOpacity onPress={() => console.log("Clicked")} style={{padding:10, alignContent:'center'}}><Text style={{textAlign:'center', color: '#fff', fontWeight: 'bold'}}>Save</Text></TouchableOpacity>

                            </View>
                        </View>
          </Modal>              

    )

}

}


  insideP(point, vs) {
    
    let x = point[0], y = point[1];

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;

}

getDistance(from, to){

    let f_lat = from[0], f_lon = from[1], t_lat = to[0], t_lon = to[1];

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${f_lat},${f_lon}&destinations=${t_lat},${t_lon}&mode=walking&key=AIzaSyBJ-lF8K3tl6y4wstWaYuhgbW8LYxx7JIQ`;

    axios.get(url)
    .then(json => json.data.rows)
    .then(results => results[0].elements)
    .then(elements => this.setState({distance: elements[0].distance.value }))


 }

 getLastLocation = async () => {

    self = this;

    firebase.database().ref("Position/" + self.props.navigation.getParam("jockeyData").id + "/" + self.state.activity.id).limitToLast(1).on('value', (data) => {

     
      data.forEach(function(child){

        const newData = child.val();   

        self.setState({userLocation: {latitude: parseFloat(newData.latitude), longitude: parseFloat(newData.longitude), speed: newData.speed}})

        self.mapView.animateToCoordinate(self.state.userLocation, 500);
        

        firebase.database().ref("Results/" + self.props.data.data.id + "/" + self.state.activity.id).push({

            latitude: self.state.userLocation.latitude,
            longitude: self.state.userLocation.longitude,
            speed: self.state.userLocation.speed,
            time: self.state.timer.minutes + ":" + self.state.timer.seconds + ":" + self.state.timer.mseconds,
            distance: self.state.distance

        })
        

        self.cehckDistanceType();

        

      })

  }).catch((error) => {

    console.log(error);

  })

  // const {data} = await axios.get("https://www.farwaniyahclub.com/voting/?page=getApi");

  // this.setState({userLocation: {latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude), speed: data.speed}})

  // if(this.state.initialCoords.latitude == 0){
      
  //     this.setState({initialCoords: {latitude: this.state.userLocation.latitude, longitude: this.state.userLocation.longitude}})


  // }

  // const polygon = [ [ 29.18070348401055, 47.81234432086579 ], [ 29.180569220689122, 47.812130638229085 ],[ 29.18052862943695, 47.81216818915736 ],[ 29.1806691375904, 47.8123711429575 ],[29.180705825810705, 47.81234342680963]];

  // if(this.insideP([this.state.userLocation.latitude, this.state.userLocation.longitude], polygon)){

  //     this.Stop();

  // }

  // //Calculate distance from start

  // this.getDistance([this.state.initialCoords.latitude, this.state.initialCoords.longitude], [this.state.userLocation.latitude, this.state.userLocation.longitude]);

}

makeTheAction(){

    firebase.database().ref("/Activities/").push({

        jockey_id: this.props.navigation.getParam("jockeyData").id,
        trainer_id: this.props.data.data.id,
        statue: 0

    }).then((success) => {
        
            this.setState({activity: {id: success.key, statue: 0}});
        
    }).catch((error) => {
        console.log(error);
    })

}

componentDidMount(){

    this.makeTheAction();

}




  StartTimer = () =>{

    if(this.state.activity != null){

    this.getLastLocation();


    const pad = (n) => n < 10 ? '0' + n : n
     
    const start = new Date().getTime();

    this.setState({start, isStart: true});
    
    this.timer = setInterval(() => {

        const now = new Date().getTime();

        const calculate = now - start;

        const duration = moment.duration(calculate)

        this.setState({
            now, 
            start, 
            timer: {
                mseconds: pad(Math.floor(duration.milliseconds() / 10)),
                seconds: pad(duration.seconds()),
                minutes: pad(duration.minutes())
            }});
    

    }, 100);

 }

}

  componentWillMount(){


}

  Stop = () => {
      clearInterval(this.timer);
      firebase.database().ref("/Activities/"+this.state.activity.id).update({
          statue: 1
      })


  }

  render() {

    const {mseconds, seconds, minutes} = this.state.timer;
    const isStart = () => {

            if(this.state.isStart){
                return (         
                <TouchableOpacity onPress={() => this.Stop()}>
                 <Icon name='ios-close' size={40}  color='white' type="ionicon" />
              </TouchableOpacity>
                )
            }else{
                return (                
                <TouchableOpacity onPress={() => this.StartTimer()}>
                <Icon name='ios-stopwatch' size={40}  color='white' type="ionicon" />
             </TouchableOpacity>)

            }

            

    }


    const polygon = [
        { latitude: 29.180669918178793, longitude: 47.812321969136306 },
        { latitude: 29.18055225863544, longitude: 47.81214963644743 },
        { latitude: 29.18055225863544, longitude: 47.81214963644743},
        { latitude: 29.180669918178793, longitude: 47.812321969136306 },
        // last point has to be same as first point
      ];

    return (


      <View style={styles.Div}>
      <StatusBar
      backgroundColor="#fff" />
      <View style={{position: 'absolute', padding:20, zIndex: 1, top: 30, left: 20, flex: 1, flexDirection: 'row'}}>
         <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Icon name="ios-arrow-back" type="ionicon" size={20} color="#fff" /></TouchableOpacity>
         <View style={{marginLeft: 22}}><Text style={{fontWeight: 'bold', color: '#fff'}}>Live Tracking System</Text></View>

           <View style={styles.distance} rounded>
             <Text style={{fontWeight: 'bold', color: '#6578F9', textAlign: 'center',}}>{this.state.distance}</Text>
           </View>


      </View>

      {this.showFinishModal()}

                
         <MapView 
            onPress={ (event) => console.log(event.nativeEvent.coordinate) }
            mapType="satellite"
            style={{flex: 1}}
            initialRegion={{
                latitude: 29.180613495855397,
                longitude: 47.81234649758561,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDela,
            }}
            ref = {(ref)=>this.mapView=ref}
            // provider={MapView.PROVIDER_GOOGLE}
        >

                    <MapView.Marker 
                        key="1"
                        title="Adam Daaif"
                        coordinate={{
                            latitude: this.state.userLocation.latitude,
                            longitude: this.state.userLocation.longitude
                        }}
                    />

                       <MapView.Polyline
                        coordinates={polygon}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#eee',
                            '#fff',
                            '#eee',
                            '#fff',
                            
                            // no color, creates a "long" gradient between the previous and next coordinate
                            ]}
		                 strokeWidth={2}
	                    />

        </MapView>
        <View style={{flexDirection: 'row',  position: 'relative', bottom: 10, backgroundColor: "transparent", height: 0, justifyContent: 'space-around'}}>
            
               
         <View style={styles.textCounter}>
             <Text style={{fontWeight: 'bold',color: '#6578F9',textAlign: 'center',}}>{minutes}:{seconds}:{mseconds}</Text>
            </View>

            <View style={styles.mybtn}>

              {isStart()}
            
            </View>
            
            <View style={styles.textCounter} rounded>
             <Text style={{fontWeight: 'bold', color: '#6578F9', textAlign: 'center',}}>{this.state.userLocation.speed} KM/H</Text>
            </View>
            
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textCounter:{
        top: -40, 
        backgroundColor: '#fff',
        height: 30,
        width: 100,
        justifyContent: 'center',
        borderRadius: 15
    },
    distance:{
        top: 20, 
        backgroundColor: '#fff',
        height: 30,
        width: 100,
        justifyContent: 'center',
        borderRadius: 15,
        left: 10
    },
    Div: {
        flex: 1,
        padding: 0,
        position: 'relative',
        zIndex: 0,
    },
    mybtn:{
        top: -50,
        zIndex: 2,
        width: 50,
        height: 50,
        padding: 3,
        backgroundColor: '#6578F9',
        borderRadius: 25,
    }

    

});

const mapStatetoPorps = ({loginAction}) => {
    return {
        data: loginAction.data
    }
}

export default connect(mapStatetoPorps)(Start);
