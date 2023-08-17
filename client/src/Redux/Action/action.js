import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS } from "./action-type";
import Swal from "sweetalert2";

export const getAllEvent = ()=>{
    return function(dispatch){
        axios.get('/events')
        .then(data=>dispatch({type: GET_ALL_EVENT, payload: data.data}))
        .catch( reason => {
            Swal.fire({
				title: "Error",
				text: `${reason.response.data.error}`,
				icon: "error",
			});
            dispatch({type: GET_ALL_EVENT, payload: []})
        });
    };
}

export const createEvent = (event)=>{
    return function(dispatch){
        axios.post(`/events/createEvent`, event)
        .then(data=>dispatch({type: CREATE_EVENT, payload: data.data}))
        .catch( reason => {
            Swal.fire({
				title: "Error",
				text: `${reason.response.data.error}`,
				icon: "error",
			});
            dispatch({type: CREATE_EVENT, payload: {}})
        });
    };
}

export const getEventsFilter = (name, eventType, country, date, order) => {
    return function(dispatch){
        axios.get(`/events/?name=${name}&eventType=${eventType}&country=${country}&date=${date}&order=${order}`)
        .then(data=>dispatch({type: FILTER_GET_EVENTS, payload: data.data}))
        .catch( reason => {
            Swal.fire({
				title: "Error",
				text: `${reason.response.data.error}`,
				icon: "error",
			});
            dispatch({type: FILTER_GET_EVENTS, payload: {}})
        });
    };
};

export const getDetail = (id) => {
    return function(dispatch){
        axios.get(`/events/${id}`)
        .then(data=>dispatch({type: GET_DETAIL, payload: data.data}))
        .catch( reason => {
            Swal.fire({
				title: "Error",
				text: `${reason.response.data.error}`,
				icon: "error",
			});
            dispatch({type: GET_DETAIL, payload: {}})
        });
    };
};
