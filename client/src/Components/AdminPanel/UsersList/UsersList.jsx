import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
const UsersList = () =>{
    const [users, setUsers] = useState([]);
    const [ user, setUser ] = useState({})
    const [errors, setErrors] = useState(null);
    const [ success, setSuccess ] = useState(null);
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('/users',{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data =>{
                console.log(data)
                setUsers(data)
            })
            .catch(error => {
                setErrors(error.response.data.error)
                navigate('/')
            } )

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
        <div className="flex flex-col justify-center">
            <h1 className="text-white ">Lista de usuarios</h1>
            {
                errors ? <p>{`${errors}`}</p> : users?.map((element, key) => {
                    return(
                        <div className="place-self-center p-5 m-2 w-[37rem] grid grid-cols-[1fr_2fr_0.2fr] border border-gray-200 rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
                            <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                            <button value={element.id} onClick={handleChange}>Banear/Desbanear</button>
                            {
                                success ? 
                                <div key={key++}>
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