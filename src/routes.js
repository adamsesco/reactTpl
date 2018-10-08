import React from 'react';

import {createStackNavigator} from 'react-navigation';


import Home from './screens/Home';

const Root = createStackNavigator(

		{
			Home: {
				screen : Home
			}
		}
	
);

export default Root;