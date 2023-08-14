import { GETDETAIL, GET_ALL_EVENT, CREATE_EVENT } from "../actions_type/actions_type";

const initialState = {
  country: ['Argentina', 'Colombia', 'Venezuela', 'Uruguay'],
  eventTypes: ['Musical', 'Deportivo', 'Artistico', 'Otro'],
  events: [],
  userSesion: {
    //userId,
    //userType
  },
  Detail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USERSESION":
      return {
        ...state,
        userSesion: action.payload,
      };
    case GETDETAIL:
      console.log(state, action)
      return {
        ...state,
        Detail: { ...state.Detail, ...action.payload, },
      };
    case GET_ALL_EVENT:
      return { ...state, events: action.payload }
    case CREATE_EVENT:
      return { ...state, events: action.payload }
    default:
      return { ...state };
  }
};

export default rootReducer;
