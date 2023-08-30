import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
const UsersList = () =>{
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState(null);
    useEffect(()=>{
        axios.get('/users',{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data =>{
                setUsers(data)
            })
            .catch(setErrors('no se pudo encontrar ningun usuario') )
    }, [])

    const handleChange = (e) => {
        // Este activa y desactiva el usuario dependiendo si estaba o no activado antes.
        axios.put(`/users/toggleUser/${id}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                setSuccess('Usuario cambiado')
            })
    };
    return(
        <div>
            {
                errors ? <p>{`${errors}`}</p> : users?.map((element, key) => {
                    return(
                        <div>
                            <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                            <label for="active">Baneado</label>
                            <input type="radio" name="active" value="false" onChange={handleChange}/>
                            <label for="active">Desbaneado</label>
                            <input type="radio" name="active" value="true" onChange={handleChange}/>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default UsersList