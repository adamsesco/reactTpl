import {LOGIN_PROGRESS, LOGIN_SUCCESS, LOGIN_FAILER, LOGOUT} from './types';

import axios from 'axios';

export const loginAction = (val) => {

    return async (dispatch) => {

        dispatch({type: LOGIN_PROGRESS});


                    const url = "https://www.farwaniyahclub.com/voting/?page=LoginApi";

                    if(val.username == '' || val.password == ''){


                        return dispatch({ type: LOGIN_FAILER, message: 1});


                    }
                    else{

                        
                        const conect = await axios.post(url, 
                            {
                            username: val.username,
                            password: val.password
                        }

                    );

                    if(conect.data.token == null){


                        return dispatch({ type: LOGIN_FAILER, message: 2 });
                        

                    }

                    return dispatch({ type: LOGIN_SUCCESS, message: 3, payload: {data: conect.data}, message: 3 });

                    }

                    


    }


}

export const Logout = () =>{

    return (dispatch) => {
        return dispatch({ type: LOGOUT});
    }

}