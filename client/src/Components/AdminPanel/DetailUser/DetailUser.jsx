import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailUser = () => {
    const { id } = useParams();
    const [ user, setUser] = useState({});
    const [ error, setError] = useState(null);
    const [ success, setSuccess] = useState(null);
    useEffect(()=>{
        axios.get('https://pf-grupo06-back.onrender.com/users', id)
            .then(res => res.data)
            .then(data =>{
                setUser(data)
            })
            .then(err =>{
                setError(err)
            })
    }, [id])
    const banUser = () =>{
        axios.delete('https://pf-grupo06-back.onrender.com/users', id)
            .then(res => res.data)
            .then(data => {
                setSuccess('Usuario borrado')
            })
    };
    const changeUser = () =>{
        
        axios.put('https://pf-grupo06-back.onrender.com/users', user)
            .then(res => res.data)
            .then(data => {
                setSuccess('Usuario cambiado')
            })
    };
    const handleChange = (e) =>{
       const value = e.currentTarget.value;
       const name = e.currentTarget.name;
       setUser({
        ... user,
        [name]: value
       })
    };
    return(
        <div>
            <h1>{user.displayName}</h1>
            <img src={user.image}/>
            <h2>{user.name}</h2>
            <input type="text" onChange={handleChange} name="name"/>
            <p>{user.email}</p>
            <input type="text" onChange={handleChange} name="email"/>
            <p>{user.address}</p>
            <input type="text" onChange={handleChange} name="address"/>


            <button onClick={banUser}>Borrar usuario</button>
            {
                success.includes('Usuario borrado') ? 
                <div>
                    <button>x</button>
                    <p>{`${success}`}</p>
                </div> : null
            }

            <button onClick={changeUser}>Cambiar usuario</button>
            {
                success.includes('Usuario cambiado') ? 
                <div>
                    <button>x</button>
                    <p>{`${success}`}</p>
                </div> : null
            }
        </div>
    )
};