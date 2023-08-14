import axios from "axios";
import { GETDETAIL } from "../actions_type/actions_type";
import URL from "../../URLspec";

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
            const DBdata = await axios.get(`${URL}/events/${id}`);
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






