import { FILTER_GET_EVENTS } from "../actions_type/actions_type.js";
import axios from "axios";
import Swal from "sweetalert2";

const getEvents = (name, eventType, country, date, order) => {
	return async function (dispatch) {
		try {
			const response = (
				await axios.get(
					`http://localhost:3001/events/filter?name=${name}&eventType=${eventType}&country=${country}&date=${date}&order=${order}`
				)
			).data;
			return dispatch({
				type: FILTER_GET_EVENTS,
				payload: response,
			});
		} catch (error) {
			Swal.fire({
				title: "Error",
				text: `${error.response.data.error}`,
				icon: "error",
			});
		}
	};
};

export default getEvents;

