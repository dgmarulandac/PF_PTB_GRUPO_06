import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL } from "./action-type";

export const getAllEvent = ()=>{
    return function(dispatch){
        axios.get('/events')
        .then(data=>dispatch({type: GET_ALL_EVENT, payload: data.data}))
        .catch( reason => {
            dispatch({type: GET_ALL_EVENT, payload: []})
        });
    };
}

export const createEvent = (event)=>{
    return async (dispatch)=>{
        const {data} = await axios.post(`/events/createEvent`, event)
        return dispatch({
            type: CREATE_EVENT,
            payload: data
        })
    }
}

export const getDetail = (id) => {
    return function(dispatch){
        axios.get(`/events/${id}`)
        .then(data=>dispatch({type: GET_DETAIL, payload: data.data}))
        .catch( reason => {
            dispatch({type: GET_DETAIL, payload: {}})
        });
    };
};
