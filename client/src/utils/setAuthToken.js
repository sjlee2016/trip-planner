import axios from 'axios';

const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token; 
        // If we have a token, send request with it. 
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken; 