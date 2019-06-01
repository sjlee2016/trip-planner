import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOG_OUT 
} from './types';
import setAuthToken from '../utils/setAuthToken';


// Logout
export const logOut = (e) => async dispatch => {
    dispatch({
        type: LOG_OUT
    });
}

// LOAD user 
export const loadUser = () => async dispatch => {
    console.log("loading user..");
    if(!localStorage.token){
        return; 
    }
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    axios.get(`/api/auth/`).then(res => dispatch({
           type: USER_LOADED,
           payload: res.data
       })).catch(err => {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    dispatch(setAlert("Server Error", 'danger'));
                    break;
                default:
                    dispatch(setAlert("Internal Error", 'danger'));
            }
        }
        dispatch({
            type: AUTH_ERROR 
        })
       });
}

// Register User
export const register = ({
    name,
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        name,
        email,
        password
    });
    try {
        const res = await axios.post('/api/users/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    dispatch(setAlert("Server Error", 'danger'));
                    break;
                case 400:
                    dispatch(setAlert("Account already exists for this email", 'danger'));
                    break;
                default:
                    dispatch(setAlert("Internal Error", 'danger'));
            }
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
};

// Login User
export const login = ({
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        email,
        password
    });
    try {
        const res = await axios.post('/api/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        if (err.response) {
            switch (err.response.status) {
                case 404:
                    dispatch(setAlert("Server Error", 'danger'));
                    break;
                default:
                    dispatch(setAlert("Internal Error", 'danger'));
            }
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
};