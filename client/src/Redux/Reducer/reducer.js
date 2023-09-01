import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS, POST_LOGIN, MODAL, LOG_OUT, ORDER_PAY, GET_MY_EVENTS, PUT_EVENT, GET_MY_SALES, ADD_CAR, GET_EVENTS_ADMIN, ADD_TO_CAR, PLUS_LESS } from "../Action/action-type";


const initialState = {
    country: ['Colombia', 'Venezuela', 'Argentina', 'Uruguay'],
    eventTypes: ['Musical', 'Deportivo', 'Artistico', 'Otro'],
    moneyTypes:['COP', 'ARS', 'VEF', 'UYU'],
    events: [],
    detail: {},
    userSesion: {},
    modalOn: false,
    myEvents: [],
    mySales: [],
    preferenceId: false,
    shoppingCar: [],
    eventsAdmin: []
}

const rootReducer = (state = initialState, action)=>{
    const {type, payload} = action
    switch(type){
        case GET_ALL_EVENT:
            return {...state, events: payload};
        case CREATE_EVENT:
            return {...state, events: [...state.events, payload]};
        case GET_DETAIL:
            return {...state, detail: payload};
        case FILTER_GET_EVENTS: //Para filtrar eventos
            return {...state, events: payload};
        case POST_LOGIN:
            return {...state, userSesion: payload};
        case MODAL:
            return {...state, modalOn: payload};
        case LOG_OUT:
            return {...state, userSesion: payload};
        case GET_MY_EVENTS:
            return {...state, myEvents: payload};
        case PUT_EVENT:
            return {...state, myEvents: [...state.myEvents.filter( event => { return event.id !== payload.id } ), payload], 
            events: [...state.events.filter( event => { return event.id !== payload.id } ), payload], 
            eventsAdmin: state.eventsAdmin.map(e => e.id === payload.id ? payload : e)};
        case ORDER_PAY:
            return {...state, preferenceId: payload};
        case GET_MY_SALES:
            return {...state, mySales: payload};
        case ADD_CAR:
            return {...state, shoppingCar: payload}
        // case ADD_TO_CAR:
        //     return {...state, shoppingCar: [...state.shoppingCar, payload]}
        case GET_EVENTS_ADMIN:
            return {...state, eventsAdmin: payload}
        default: 
            return state;
    }
}
export default rootReducer
