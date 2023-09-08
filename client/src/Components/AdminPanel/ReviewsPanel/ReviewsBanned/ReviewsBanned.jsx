import React, { useState, useEffect } from "react";
import axios from "axios";
import Paginado from "../../../pagination/pagination";
import * as styles from "../../../EventsDashboard/EventDashboardStiles";

const ReviewsBanned = () => {
    const [reviews, setReviews] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;

    const ultimoIndex = currentPage * eventsPerPage;
    const primerIndex = ultimoIndex - eventsPerPage;

    const [reviewsAMostrar, setReviewsAMostrar] = useState([]);

    useEffect(() => {
        setCurrentPage(1);
    }, [reviews]);

    useEffect(() => {
        setReviewsAMostrar(reviews.slice(primerIndex, ultimoIndex));
        console.log(reviewsAMostrar)
    }, [reviews, currentPage]);
    useEffect(() => {
        axios.get('/reviews/admin', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                setReviews(data.filter(element => element.approved === false))
                console.log('hola', data.filter(element => element.approved !== false))
            })
    }, [])
    const handleClick = (e) => {
        const { value } = e.currentTarget
        axios.put(`/reviews/putReview/${value}`, value, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                const reAdded = [...reviews?.filter(element => element.id !== data.id)];
                setReviews(reAdded)
            })
    };
    useEffect(()=>{
        setReviewsAMostrar(reviews.slice(primerIndex, ultimoIndex))
    }, [reviews])
    return (

        <div>
            <h2>Comentarios ocultos:</h2>
            <div className="grid">

                {
                    reviewsAMostrar?.length > 0 ?
                    reviewsAMostrar.filter(element => element.approved === false).map((element, key) => {
                            {
                                return (
                                    <div key={key++} className="odd:bg-slate-800 flex h-20 items-center gap-x-5 space-between justify-between px-5">

                                        <p>{element.comment}</p>
                                        <div className="flex flex-col">
                                            <div>
                                                <button onClick={handleClick} value={element.id} className="py-3 px-8 bg-green-900 hover:bg-green-800 mx-2 rounded-md ">Activar</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        :
                        null
                }
            </div>
            <div>
            <Paginado
                    eventsPerPage={eventsPerPage}
                    events={reviews}
                    page={currentPage}
                    paginado={setCurrentPage}
                />
            </div>
        </div>
    )
}
export default ReviewsBanned