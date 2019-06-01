import { SET_ALERT , REMOVE_ALERT } from '../actions/types'; 

const intialState = [
]

export default function(state = intialState, action){
    const { type , payload } = action; 
    switch(type){
        case SET_ALERT :  
            return [ ...state , payload];  // return current state with the payload 
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);  // filter out the alert with id 
        default : 
            return state;
    }
}