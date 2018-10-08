import React, { Component } from 'react';

import {connect} from 'react-redux';

import {fetchData} from '../actions/SearchAction';

import {View, Text} from 'react-native'

class Home extends Component{
	
	componentDidMount(){
        this.props.fetchData('M');
		
		console.log(this.props.search)
	}
	
	render(){
	
		return(
		
		 	<View><Text>Home pgae</Text></View>
		 
		)
	
	}
}

const mapStatetoProps = ({search}) => {
	
	return {
		search
	};
	
}

export default connect(mapStatetoProps, {fetchData})(Home);