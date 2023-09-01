import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
const UsersList = () =>{
    const [users, setUsers] = useState([]);
    const [ user, setUser ] = useState({})
    const [errors, setErrors] = useState(null);
    const [ success, setSuccess ] = useState(null);
    useEffect(()=>{
        // axios.get('/users',{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        //     .then(res => res.data)
        //     .then(data =>{
        //         console.log(data)
        //         setUsers(data)
        //     })
        //     .catch(err => {setErrors(err)} )
        axios.get('/users', { headers: { 'X-Access-Token': localStorage.getItem('jwt')}})
            .then(res => res.data)
            .then(data => {
                setUser(data)
            })
            .catch((err) => {console.log(err)})
    }, [])

    const handleChange = (e) => {
        const id = e.currentTarget.value;
        axios.get(`/users/${id}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        .then(res => res.data)
        .then(data =>{
            setUser(data)
        })
        .catch(setErrors('no se pudo encontrar ningun usuario') )
        setUser({
            ... user,
            active: !user.active
        })
        if(user.displayName){
            // Este activa y desactiva el usuario dependiendo si estaba o no activado antes.
            axios.put(`/users/toggleUser/${id}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
                .then(res => res.data)
                .then(data => {
                    setSuccess('Listo')
                })
        }
    };
    return(
        <div>
            {
                errors ? <p>{`${errors}`}</p> : users?.map((element, key) => {
                    return(
                        <div>
                            <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                            <button value={element.id} onClick={handleChange}>Banear/Desbanear</button>
                            {
                                success ? 
                                <div>
                                    <button onClick={()=>{setSuccess(null)}}>x</button>
                                    <p>{`${success}`}</p>     
                                </div> : null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
};

export default UsersList