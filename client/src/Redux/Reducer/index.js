import { GET_ALL_EVENT, CREATE_EVENT } from "../Action/action-type"

const initialState = {
    country: ['Argentina', 'Colombia', 'Venezuela', 'Uruguay'],
    eventTypes: ['Musical', 'Deportivo', 'Artistico', 'Otro'],
    events: []
}

const rootReducer = (state = initialState, action)=>{
    const {type, payload} = action
    switch(type){
        case GET_ALL_EVENT:
            return {...state, events: payload}
        case CREATE_EVENT:
            return {...state, events: payload}
        default: return state
    }
}
export default rootReducer