import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS } from "./action-type";
import Swal from "sweetalert2";

export const getAllEvent = ()=>{
    return function(dispatch){
        axios.get('/events')
        .then(data=>dispatch({type: GET_ALL_EVENT, payload: data.data}))
        .catch( reason => {
            dispatch({type: GET_ALL_EVENT, payload: []})
        });
    }; 
};

export const createEvent = (event)=>{
    return async (dispatch)=>{
        const {data} = await axios.post(`/events/createEvent`, event)
        return dispatch({
            type: CREATE_EVENT,
            payload: data
        })
    }
}

export const getEventsFilter = (name, eventType, country, date, order) => {
	return async function (dispatch) {
		try {
			const response = (
				await axios.get(
					`/events/filter?name=${name}&eventType=${eventType}&country=${country}&date=${date}&order=${order}`
				)
			).data;
			return dispatch({
				type: FILTER_GET_EVENTS,
				payload: response,
			});
		} catch (error) {
			Swal.fire({
				title: "Error",
				text: `${error.response.data.error}`,
				icon: "error",
			});
		}
	};
};

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
