import React from 'react';

import { DrawerNavigator, DrawerItems, createDrawerNavigator, createStackNavigator } from 'react-navigation'

import {Content, Body, Container, Header} from 'native-base';

import Home from './screens/Home';
import HomeTwo from './screens/HomeTwo';


const Root = createStackNavigator(

		{
			Home: {
				screen : Home
			},
			HomeTwo: {
				screen : HomeTwo
			}

		}
	);		

export default Root;