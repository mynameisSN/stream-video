import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'; 
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
    // myfirstr: ()=> 'dfdf'
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
})