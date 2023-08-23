import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS, POST_LOGIN, MODAL, LOG_OUT, GET_MY_EVENTS, PUT_EVENT } from "../Action/action-type";


const initialState = {
    country: ['Colombia', 'Venezuela', 'Argentina', 'Uruguay'],
    eventTypes: ['Musical', 'Deportivo', 'Artistico', 'Otro'],
    moneyTypes:['COP', 'ARS', 'VEF', 'UYU'],
    events: [],
    detail: {},
    userSesion: {},
    myEvents: [],
    modalOn: false
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
            return {...state, myEvents: [...state.myEvents.filter( event => { return event.id !== payload.id } ), payload], events: [...state.events.filter( event => { return event.id !== payload.id } ), payload]};
        default: 
            return state;
    }
}
export default rootReducer
