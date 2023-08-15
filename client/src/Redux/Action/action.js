import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL } from "./action-type";

export const getAllEvent = ()=>{
    return async (dispatch)=>{
        const data = await axios.get(`/events`)
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

export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            let data = null;
            axios.get(`/events/${id}`)
            .then(res => res.data)
            .then(data => {
                data = data;
            });
            console.log("Data fetched:", data); // Agrega esto
            return dispatch({
                type: GET_DETAIL,
                payload: data,
            });
        } catch (error) {
            console.log("Error fetching data:", error); // Agrega esto
            return dispatch({
                type: GET_DETAIL,
                payload:{error:"error no se ha encontrado el ticket"},
            });
        }
    };
};
