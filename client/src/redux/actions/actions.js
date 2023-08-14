import axios from "axios";
import { GETDETAIL } from "../actions_type/actions_type";

const USERSESION = "USERSESION";

const userSecion = (data) => {
  return {
    type: USERSESION,
    payload: data,
  };
};

export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            let data = null;
            axios.get(`/events/${id}`)
            .then(res => res.data)
            .then(data => {
                data = data;
            });
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






