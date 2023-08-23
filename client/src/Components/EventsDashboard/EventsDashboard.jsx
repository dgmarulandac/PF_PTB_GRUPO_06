import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyEvents } from "../../Redux/Action/action";


const EventsDashboard = () => {
    const user = useSelector((state) => state.user);
    const events = useSelector((state) => state.myEvents);

    useEffect(() => {
        dispatch(getMyEvents());
    }, []);



};