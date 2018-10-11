import React from 'react';

import { DrawerNavigator, DrawerItems, createDrawerNavigator, createStackNavigator } from 'react-navigation'


import Home from './screens/Home';
import Login from './screens/Login';
import HomeTwo from './screens/HomeTwo';


const Root = createStackNavigator(

		{

			Login: {
				screen : Login
			},
			Home: {
				screen : Home
			},
			HomeTwo: {
				screen : HomeTwo
			}

		}
	);		

export default Root;