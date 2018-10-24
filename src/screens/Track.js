import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import { MapView, PROVIDER_GOOGLE , Permissions} from 'expo';
import {Text, Button, Icon } from 'react-native-elements';
import firebase from 'firebase';
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.0001;
const LONG_DELTA = 0.0001;


class Track extends Component {
    static navigationOptions = {
        header: null
    }
    

    constructor(props) {
        super(props);
        this.state = {
            initMap: true,
            userLocation: {
                latitude: 29.180669918178793,
                longitude: 47.812321969136306,
                speed: 0
            },
            longitudeDelta:LONG_DELTA,
            query: '',
            searchResult: null,
            btnDisabled: true,
            timer: null,
            counter: '00',
            miliseconds: '00',
            minutes: '00',
            token: ''
        };
    }

    myStopFunction() {

        clearInterval(myVar);
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

    async getMylocation(uniqyeId) {
        //getCurrentPositionAsync. 
        const {status} = await Permissions.askAsync(Permissions.LOCATION);

        if(status === 'granted'){

            const dataId = this.props.data.data.id;


            const polygon = [ [ 29.18070348401055, 47.81234432086579 ], [ 29.180569220689122, 47.812130638229085 ],[ 29.18052862943695, 47.81216818915736 ],[ 29.1806691375904, 47.8123711429575 ],[29.180705825810705, 47.81234342680963]];


            this.makeit = await setInterval(() => {

        

            this.watchID = navigator.geolocation.watchPosition((position) => {


                firebase.database().ref("Position/" + dataId + "/" + uniqyeId).push({

                        userid: dataId,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude, 
                        speed: parseFloat(position.coords.speed * 1.60).toFixed(2)

                })

                this.setState({userLocation: {latitude: position.coords.latitude, longitude: position.coords.longitude, speed: parseFloat(position.coords.speed * 1.60).toFixed(2)}})
                this.mapView.animateToCoordinate(this.state.userLocation, 500);


                  
            },
              (error) => console.log(error.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },

            )


        }, 1000);


    }

}

    checkTrackAction(){

        self = this;

        firebase.database().ref("/Activities/")
        .orderByChild("jockey_id").equalTo(this.props.data.data.id)
        .limitToLast(1).on('value', (data) => {

            data.forEach(function(child){

               if(child.val().statue == 0){

                self.getMylocation(child.key);

                self.setState({token: child.key})

               }else{
                   self.Stop();

                   firebase.database().ref("Position/" + self.props.data.data.id + "/" + self.state.token).remove();

               }

            });
          
        });    

    }


 
    Stop = () => {
        clearInterval(this.makeit);
    }



    toggleSearchResult() {
        if (!this.state.searchResult) return;
    }
    componentDidMount(){

        this.checkTrackAction();



        // const polygon = [ [ 29.18070348401055, 47.81234432086579 ], [ 29.180569220689122, 47.812130638229085 ],[ 29.18052862943695, 47.81216818915736 ],[ 29.1806691375904, 47.8123711429575 ],[29.180705825810705, 47.81234342680963]];


        // if(this.insideP([this.state.userLocation.latitude, this.state.userLocation.longitude], polygon)){

        //     console.log("Finish");

        // }
    }


    render() {

        const polygon = [
            { latitude: 29.180669918178793, longitude: 47.812321969136306 },
            { latitude: 29.180569220689122, longitude: 47.812130638229085 },
            { latitude: 29.180569220689122, longitude: 47.812130638229085 },
            { latitude: 29.180669918178793, longitude: 47.812321969136306 },
            // last point has to be same as first point
          ];

        const {userLocation} = this.state;
        return (
            
            <ScrollView style={styles.container}>

                <SafeAreaView style={{marginVertical: 15, flex: 1, position: 'relative'}} >
                <View style={{width: 110, borderRadius: 4, alignItems:'center', backgroundColor: '#153B44', padding: 12, position: "absolute", top: 20, right: 10, zIndex: 1, opacity: .5}}>
                    <Text style={{fontWeight: 'bold', color: '#fff'}}>{this.state.userLocation.speed} Km/h</Text>
                </View>
                <View style={{width: 130, borderRadius: 4, flexDirection:'row', backgroundColor: '#153B44', padding: 12, position: "absolute", top: 20, left: 10, zIndex: 1, opacity: .5}}>
                    <Icon name='ios-timer' type='ionicon' color="#fff" size={16} />
                    <Text style={{fontSize:13, marginLeft: 20, fontWeight: 'bold', color: '#fff'}}>{this.state.minutes} : {this.state.counter} :  {this.state.miliseconds}</Text>
                </View>
                    <MapView 
                        mapType="satellite"
                        onPress={ (event) => console.log(event.nativeEvent.coordinate) }
                        showsUserLocation={false}
                        title={this.props.data.username}
                        ref = {(ref) => this.mapView=ref}
                        style={{ flex: 1, minHeight: Dimensions.get("window").height}}
                        initialRegion={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LONG_DELTA
                        }}
                    >

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


                    <MapView.Marker 
                        key="1"
                        title="Adam Daaif"
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude
                        }}
                    />

                    </MapView>
                </SafeAreaView>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

const maptStateToProps = ({ loginAction }) => {
    return {

        data: loginAction.data

    };
};

export default connect(maptStateToProps)(Track);