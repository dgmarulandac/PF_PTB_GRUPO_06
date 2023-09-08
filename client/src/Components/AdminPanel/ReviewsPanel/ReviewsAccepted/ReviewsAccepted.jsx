import React from "react";

const ReviewsAccepted = () =>{
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
            <h1>Panel de Reviews</h1>
            <div className="grid md:grid-cols-2 grid-cols-1">

                <div>
                    <h2>Comentarios aceptados:</h2>
                    <div>

                    {
                        reviews?.length > 0 ?
                            reviews.filter(element => element.approved === true).map((element, key) => {
                                {
                                    return (
                                        <div key={key++} className="odd:bg-slate-800 flex h-20 items-center gap-x-5 space-between justify-between px-5">

                                            <p>{element.comment}</p>
                                            <div className="flex flex-col">
                                                <div>
                                                    <button onClick={handleClick} value={element.id} className="px-5 hover:bg-red-800 bg-red-900 mx-2 rounded-md" style={{ height: '50px' }}>Desactivar</button>
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
                
            </div>
        </div>
    )
}