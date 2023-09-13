import axios from "axios";
import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS, POST_LOGIN, MODAL, LOG_OUT, ORDER_PAY, GET_MY_EVENTS, PUT_EVENT, GET_MY_SALES, POST_REVIEW, ADD_CAR, GET_EVENTS_ADMIN, ADD_TO_CAR, PLUS_LESS, PUT_PROFILE, DELETE_EVENT_CAR, SEARCH_EVENT_ADMIN } from "./action-type";
import Swal from "sweetalert2";

export const getAllEvent = () => {
    return function (dispatch) {
      return new Promise((resolve, reject) => {
        axios.get('/events', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
          .then(data => {
            dispatch({ type: GET_ALL_EVENT, payload: data.data });
            resolve(); // Resuelve la promesa cuando los datos se han cargado con éxito
          })
          .catch(reason => {
            Swal.fire({
              title: "Error",
              text: `${reason.response.data.error}`,
              icon: "error",
            });
            dispatch({ type: GET_ALL_EVENT, payload: { message: "No se ha encontrado ningún evento" } });
            reject(); // Rechaza la promesa en caso de error
          });
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

export const getEventsFilter = (name, eventType, country, date, order, sortOrder) => {
    return function (dispatch) {
        axios.get(`/events/?name=${name}&eventType=${eventType}&country=${country}&date=${date}&order=${order}&sortOrder=${sortOrder}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: FILTER_GET_EVENTS, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: FILTER_GET_EVENTS, payload: [] })
            });
    };
};

export const getDetail = (id) => {
    if(id===undefined) return {type:GET_DETAIL, payload:[]}
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

export const getMyEvents = () => {
    return function (dispatch) {
        axios.get(`/events/myEvents`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: GET_MY_EVENTS, payload: data.data }))
            .catch(reason => {
                console.log(reason);
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
    console.log('Ejecutando myAction desde aquí:', new Error().stack)
    return {
        type: MODAL,
        payload: value
    };
};

export const cambiarTicket = (payload) => {
    return {
        type: PUT_EVENT,
        payload: payload
    };
};

export const logOut = () => {
    localStorage.removeItem('shoppingCar')
    localStorage.removeItem('jwt');
    
    return(dispatch)=>{
        axios.post(`/carts/createCart`, {items: []}, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(({data}) =>{
                localStorage.setItem('shoppingCar', data.token)
                
                return dispatch({
                    type: LOG_OUT,
                    payload: data.events
                })
            })
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

export const eventsAdmin = ()=>{
    return (dispatch)=>{
        axios.get('/events/admin', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        .then(({data}) => {
           return dispatch({type: GET_EVENTS_ADMIN, payload: data})
        })
        .catch(reason => {
            Swal.fire({
                title: "Error",
                text: `${reason.response.data.error}`,
                icon: "error",
            });
            return dispatch({type: GET_EVENTS_ADMIN, payload: []})
        })
    
    }
}

export const addCar = (car)=>{
    return {
        type: ADD_CAR,
        payload: car
    }
}

export const addToCar = (event)=>{
    return (dispatch)=>{
        axios.put('carts/updateCart', {events: [event], token: localStorage.getItem('shoppingCar')}, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        .then(({data}) => {
           return dispatch({type: ADD_CAR, payload: data.Events})
        })
        .catch(reason => {
            console.log(reason)
            Swal.fire({
                title: "Error",
                text: `${reason.response.data.error}`,
                icon: "error",
            });
            return dispatch({type: ADD_CAR, payload: []})
        })}
}

export const deleteEventCar = (id)=>{
    return (dispatch)=>{
        axios.delete('/carts/deleteEventCart', { data: { token: localStorage.getItem('shoppingCar'), eventId: id },headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        .then(response => {
            console.log(response)
            return dispatch({
                type: DELETE_EVENT_CAR,
                payload: id
            })
        })
        .catch(reason => {
            console.log(reason)
            Swal.fire({
                title: "Error",
                text: `${reason.response.data.error}`,
                icon: "error",
            });
            return dispatch({type: DELETE_EVENT_CAR, payload: ""})
        })}
}

export const searchEventAdmin = (value)=>{
    return function (dispatch) {
        axios.get(`/events/admin/?name=${value}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: SEARCH_EVENT_ADMIN, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: SEARCH_EVENT_ADMIN, payload: {} })
            });
    };
}



export const putUserProfile = (editedProfile) => {
    return function (dispatch) {
        axios.put(`/users/updateProfile`, editedProfile, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(data => dispatch({ type: PUT_PROFILE, payload: data.data }))
            .catch(reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
                dispatch({ type: PUT_PROFILE, payload: {} })
            });
    };
};