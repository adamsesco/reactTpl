import {
    LOGIN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_FAILER,
    LOGOUT
} from '../actions/types';

const INITIAL_STATE = { loading: false, data: '', message: 0 };

export default (state = INITIAL_STATE, action) => {

    switch(action.type){

        case LOGIN_PROGRESS:

        return {...INITIAL_STATE, loading: true};

        case LOGIN_FAILER:

        return {...INITIAL_STATE, loading: false, message: action.message}

        case LOGIN_SUCCESS:

        return {...INITIAL_STATE, loading: false, data: action.payload}

        case LOGOUT:

        return {...INITIAL_STATE}

        default: return state;

    }

}