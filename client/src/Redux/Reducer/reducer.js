import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL, FILTER_GET_EVENTS, MODAL } from "../Action/action-type";

const initialState = {
    country: ['Colombia', 'Venezuela', 'Argentina', 'Uruguay'],
    eventTypes: ['Musical', 'Deportivo', 'Artistico', 'Otro'],
    events: [],
    detail: {},
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
			return {
				...state,
				events: action.payload,
			};
        case MODAL:
            return {
                ...state,
                modalOn: payload
            }
            
        default: return state;
    }
}
export default rootReducer