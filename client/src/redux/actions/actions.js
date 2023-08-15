import axios from "axios";
import { GETDETAIL, GET_ALL_EVENT, CREATE_EVENT, USERSESION } from "../actions_type/actions_type";


export const userSecion = (data) => {
  return {
    type: USERSESION,
    payload: data,
  };
};

export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const DBdata = await axios(`http://localhost:3001/detail/${id}`);
            const data = DBdata.data;
            console.log("Data fetched:", data); // Agrega esto
            return dispatch({
                type: GETDETAIL,
                payload: data,
            });
        } catch (error) {
            console.log("Error fetching data:", error); // Agrega esto
            return dispatch({
                type: GETDETAIL,
                payload:{error:"error no se ha encontrado el ticket"},
            });
        }
    };
};

export const getAllEvent = ()=>{
    return async (dispatch)=>{
        const {data} = await axios.get("/")
        return dispatch({
            type: GET_ALL_EVENT,
            payload: data
        })
    }
}

export const createEvent = (event)=>{
    return async (dispatch)=>{
        const {data} = await axios.post("/createEvent", event)
        return dispatch({
            type: CREATE_EVENT,
            payload: data
        })
    }
}
