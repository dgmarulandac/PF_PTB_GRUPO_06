import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS, POST_LOGIN, MODAL, LOG_OUT, ORDER_PAY, GET_MY_EVENTS, PUT_EVENT, GET_MY_SALES, ADD_CAR } from "./action-type";
import Swal from "sweetalert2";

export const getAllEvent = () => {
    return function (dispatch) {
        axios.get('/events', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: GET_ALL_EVENT, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response}`,
                    icon: "error",
                });
                dispatch({ type: GET_ALL_EVENT, payload: [] })
            });
    };
}

export const createEvent = (event) => {
    return function (dispatch) {
        axios.post(`/events/createEvent`, event, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
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
        axios.get(`/events/?name=${name}&eventType=${eventType}&country=${country}&date=${date}&order=${order}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: FILTER_GET_EVENTS, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response}`,
                    icon: "error",
                });
                dispatch({ type: FILTER_GET_EVENTS, payload: {} })
            });
    };
};

export const getDetail = (id) => {
    return function (dispatch) {
        axios.get(`/events/${id}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
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

export const getMyEvents = (id) => {
    return function (dispatch) {
        axios.get(`/events/myEvents/${id}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: GET_MY_EVENTS, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: GET_MY_EVENTS, payload: {} })
            });
    };
};

export const putEvent = (id, event) => {
    return function (dispatch) {
        axios.put(`/events/updateEvent/${id}`, event, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: PUT_EVENT, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: PUT_EVENT, payload: {} })
            });
    };
};

export const postLogin = (user) => {
    return function (dispatch) {
        axios.post(`/users/login`, user, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => {
                localStorage.setItem('jwt', data.data.jwt);
                return dispatch({ type: POST_LOGIN, payload: data.data });
            })
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
        axios.post(`/users/auth`, {jwt}, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => {
                localStorage.setItem('jwt', data.data.jwt);
                return dispatch({ type: POST_LOGIN, payload: data.data });
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
    };
};

export const logOut = () => {
    localStorage.removeItem('jwt');
    return {
        type: LOG_OUT,
        payload: {}
    };
}

export const orderPay = (order) => {
    return (dispatch)=>{
        axios.post('/orders/createOrder', order, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        .then(data =>{
            return dispatch({type: ORDER_PAY, payload: data});
        }).catch(reason => {
            Swal.fire({
                title: "Error",
                text: `${reason.response.data.error}`,
                icon: "error",
            });
            return dispatch({ type: ORDER_PAY, payload: {} })
        });
    }
}

export const getMySales = () => {
    return (dispatch)=>{
        axios.get('/sales/mySales', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        .then(data =>{
            return dispatch({type: GET_MY_SALES, payload: data.data});
        }).catch(reason => {
            Swal.fire({
                title: "Error",
                text: `${reason.response.data.error}`,
                icon: "error",
            });
            return dispatch({ type: GET_MY_SALES, payload: [] })
        });
    }
};

export const addCar = (order)=>{
    return {
        type: ADD_CAR,
        payload: order
    }
}