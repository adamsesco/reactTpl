import {FETCH_DATA_SEARCH, FETCH_PROGRESS} from './types';

import axios from 'axios';

export const fetchData = (val) => {

    return async (dispatch) => {

        dispatch({type: FETCH_PROGRESS});


                const {data} = await axios.get(`https://www.farwaniyahclub.com/getSearch?query=${val}`);

                return dispatch({ type: FETCH_DATA_SEARCH, payload: {data: data.Horses} });


    }


}