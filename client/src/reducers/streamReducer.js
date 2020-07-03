import _ from 'lodash';
import {
  FETCH_STREAMS,
  FETCH_STREAM,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from '../actions/types';


export default (state = {}, action)=>{
    switch(action.type){
         case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload)// setting 2nd argument action.payload because as we dispatching ID from my DELETE_STREAM action type from action/inde.js.. and for other action we are dispatching data in payload.
       
        default:
            return state;

    }

}