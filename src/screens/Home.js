import React, { Component } from 'react';

import {connect} from 'react-redux';

import {fetchData} from '../actions/SearchAction';

import {View, Text} from 'react-native'

import HeaderTpl from '../components/Header';
import { Button } from 'native-base';


class Home extends Component{

	static navigationOptions = {
		header: null,
		};
	
	componentDidMount(){
		
	}
	
	render(){

	
		return(

		
		<View>

			<HeaderTpl title="Farwaniyah Equiestrian Club" />	
			<View><Button onPress={() => this.props.navigation.navigate('HomeTwo')}><Text>Back</Text></Button></View>


		</View>
		
		 	
		 
		)
	
	}
}

const mapStatetoProps = ({search}) => {
	
	return {
		search
	};
	
}

export default connect(mapStatetoProps, {fetchData})(Home);