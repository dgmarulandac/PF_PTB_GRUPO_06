import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import mockDetail from "../../mocks/eventDetail.json"
import { getDetail } from "../../redux/actions/actions"

const Detail = () => {

    const dispatch = useDispatch()
    const {id} = useParams()
    const ticketid = useSelector ((state)=> state.Detail)
    //const ticketid = mockDetail
    
    useEffect(()=>{
        dispatch(getDetail(id))
    },[])

    return (
        <div>
        <h1>{ticketid.name}</h1>
        {/* <h3>{ticketid.image}</h3>
        <h3>{ticketid.image}</h3>
        <h3>{ticketid.country}</h3>
        <h3>{ticketid.date}</h3>
        <h3>{ticketid.description}</h3>
        <h3>{ticketid.eventType}</h3>
        <h3>{ticketid.cantTickets}</h3> */}
        <h1>{ticketid.error}</h1>
        </div>

    )
}

export default Detail