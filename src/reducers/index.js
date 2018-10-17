import {combineReducers} from 'redux';

import search from './SearchReducer';
import loginAction from './LoginReducer';


export default combineReducers({
    search,
    loginAction
});