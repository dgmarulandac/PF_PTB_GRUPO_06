import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT } from "./action-type";

export const getAllEvent = ()=>{
    return async (dispatch)=>{
        const {data} = await axios.get(`/events`)
        return dispatch({
            type: GET_ALL_EVENT,
            payload: data
        })
    }
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
