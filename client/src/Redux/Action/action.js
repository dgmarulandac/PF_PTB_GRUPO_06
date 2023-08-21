import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS, POST_LOGIN, MODAL } from "./action-type";
import Swal from "sweetalert2";

export const getAllEvent = () => {
    return function (dispatch) {
        axios.get('/events')
            .then(data => dispatch({ type: GET_ALL_EVENT, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: GET_ALL_EVENT, payload: [] })
            });
    };
}

export const createEvent = (event) => {
    return function (dispatch) {
        axios.post(`/events/createEvent`, event)
            .then(data => dispatch({ type: CREATE_EVENT, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: CREATE_EVENT, payload: {} })
            });
    };
}

export const getEventsFilter = (name, eventType, country, date, order) => {
    return function (dispatch) {
        axios.get(`/events/?name=${name}&eventType=${eventType}&country=${country}&date=${date}&order=${order}`)
            .then(data => dispatch({ type: FILTER_GET_EVENTS, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: FILTER_GET_EVENTS, payload: {} })
            });
    };
};

export const getDetail = (id) => {
    return function (dispatch) {
        axios.get(`/events/${id}`)
            .then(data => dispatch({ type: GET_DETAIL, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: GET_DETAIL, payload: {} })
            });
    };
};

export const postLogin = (user) => {
    return function (dispatch) {
        axios.post(`/users/login`, user)
            .then(data => dispatch({ type: POST_LOGIN, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: POST_LOGIN, payload: {} })
            });
    };
};

export const postAuth = (jwt) => {
    return function (dispatch) {
        axios.post(`/users/auth`, jwt)
            .then(data => {
                localStorage.setItem('jwt', data.data.jwt)
                return dispatch({ type: POST_LOGIN, payload: data.data })
            })
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                return dispatch({ type: POST_LOGIN, payload: {} })
            });
    };
};

export const modal = (value) => {
    return {
        type: MODAL,
        payload: value
    }
}