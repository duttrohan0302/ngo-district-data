import api from '../Utils/api';
import { setAlert } from './alertActions';

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

import setAuthToken from "../Utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Load User
export const loadUser = (decoded) => async dispatch => {
  try {
    console.log('called')
    dispatch({
      type: USER_LOADED,
      payload: decoded
    });
  } catch (err) {
    console.log(err)
    console.log(err.response.data)
    dispatch({
      type: AUTH_ERROR
    });
  }
};


// Login User- Get user token
export const login = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/login', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });


    const { token } = res.data;
    console.log(token)
    // Set token to local storage
    localStorage.setItem("jwtToken", token);
    console.log(localStorage.getItem("jwtToken"))
    // Set token to auth header
    setAuthToken(token);

    const decoded = jwt_decode(token);
    console.log(decoded)
    dispatch(setAlert(`Login Successful, Welcome ${decoded.name}!`,'success',4000));

    dispatch(loadUser(decoded));

  } catch (err) {
    console.log(err)
    if(err.response){
      const errors = err.response.data;
      console.log(errors)
      dispatch({
        type: LOGIN_FAIL,
        payload: errors
      });
    }
  }
};

// Logout
export const logout = () => (dispatch) => {
  console.log("called")
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    //   // Remove auth header for future requests
    setAuthToken(false);
    dispatch({
        type:LOGOUT
    })

}
