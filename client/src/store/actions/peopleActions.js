import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS } from './types';

export const updateProfile = (userData, history) => dispatch => {
    
    axios
        .post('/api/profile', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data 
            })
        );
}

export const getUsers = (userData, history) => dispatch => {
    
    axios
        .get('/api/profile/all')
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data 
            })
        );
}