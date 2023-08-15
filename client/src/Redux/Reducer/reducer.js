import { GET_ALL_EVENT, CREATE_EVENT, GET_DETAIL } from "../Action/action-type";

const initialState = {
    country: ['Argentina', 'Colombia', 'Venezuela', 'Uruguay'],
    eventTypes: ['Musical', 'Deportivo', 'Artistico', 'Otro'],
    events: [],
    Detail: {},
}

const rootReducer = (state = initialState, action)=>{
    const {type, payload} = action
    switch(type){
        case GET_ALL_EVENT:
            return {...state, events: payload};
        case CREATE_EVENT:
            return {...state, events: payload};
        case GET_DETAIL:
            return {...state, Detail: {...state.Detail,...action.payload}};
            case FILTER_GET_EVENTS: //Para filtrar eventos
			return {
				...state,
				events: action.payload,
			};
        default: return state;
    }
}
export default rootReducer