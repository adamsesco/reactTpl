import React from 'react';

import { DrawerNavigator, DrawerItems, createDrawerNavigator, createStackNavigator } from 'react-navigation'


import Home from './screens/Home';
import Login from './screens/Login';
import HomeTwo from './screens/HomeTwo';
import Signup from './screens/Signup';
import AddJockey from './screens/AddJockey';
import Profile from './screens/Profile';
import Start from './screens/Start';


const Root = createStackNavigator(

		{

			Login: {
				screen : Login
			},
			Home: {
				screen : Home
			},
			Signup: {
				screen : Signup
			},
			HomeTwo: {
				screen : HomeTwo
			},
			AddJockey: {
				screen: AddJockey
			},
			Profile: {
				screen: Profile
			},
			Start: {
				screen: Start
			}

		}
	);		

export default Root;