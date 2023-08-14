import { 
  FILTER_GET_EVENTS,
  GETDETAIL,
  GET_ALL_EVENT, 
  CREATE_EVENT
} from "../actions_type/actions_type";

const initialState = {
  userSesion: {
    //userId,
    //userType
  },
  Detail: {},
  events: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERSESION":
      return {
        ...state,
        userSesion: action.payload,
      };
      case FILTER_GET_EVENTS: //Para filtrar eventos
			return {
				...state,
				events: action.payload,
			}; 
      case GET_ALL_EVENT:
            return {
              ...state, 
              events: action.payload
            }
        case CREATE_EVENT:
            return {
              ...state, 
              events: action.payload
            }
    case GETDETAIL:
        console.log(state,action)
      return {
        ...state,
        Detail: {...state.Detail,...action.payload,},
      };

    default:
      return { ...state };
  }
};

export default rootReducer;

// const initialState = {
//     country: ['Argentina', 'Colombia', 'Venezuela', 'Uruguay'],
//     eventTypes: ['Musical', 'Deportivo', 'Artistico', 'Otro'],
//     events: []
// }

// const rootReducer = (state = initialState, action)=>{
//     const {type, payload} = action
//     switch(type){
//         case GET_ALL_EVENT:
//             return {...state, events: payload}
//         case CREATE_EVENT:
//             return {...state, events: payload}
//         default: return state
//     }
// }
// export default rootReducer
