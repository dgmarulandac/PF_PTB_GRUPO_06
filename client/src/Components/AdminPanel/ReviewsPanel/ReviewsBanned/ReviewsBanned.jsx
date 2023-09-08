import React from "react";

const ReviewsBanned = () =>{
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        axios.get('/reviews/admin', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                setReviews(data)
            })
    }, [])
    const handleClick = (e) => {
        const { value } = e.currentTarget
        console.log(value)
        axios.put(`/reviews/putReview/${value}`, value, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                const reAdded = [...reviews?.filter(element => element.id !== data.id), data];
                setReviews(reAdded)
            })
    };
    return(

        <div>
                    <h2>Comentarios ocultos:</h2>
                    <div className="grid">

                        {
                            reviews?.length > 0 ?
                                reviews.filter(element => element.approved === false).map((element, key) => {
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
                </div>
    )
}