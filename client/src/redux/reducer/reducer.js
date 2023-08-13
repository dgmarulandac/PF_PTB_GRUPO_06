import { GETDETAIL } from "../actions_type/actions_type";

const initialState = {
  userSesion: {
    //userId,
    //userType
  },
  Detail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.payload) {
    case "USERSESION":
      return {
        ...state,
        userSesion: action.payload,
      };
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
