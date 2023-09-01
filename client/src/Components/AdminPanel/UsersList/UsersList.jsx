import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
const UsersList = () =>{
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState(null);
    useEffect(()=>{
        axios.get('/users')
            .then(res => res.data)
            .then(data =>{
                setUsers(data)
            })
            .catch(setErrors('no se pudo encontrar ningun usuario') )
    }, [])
    return(
        <div>
            {
                errors ? <p>{`${errors}`}</p> : users?.map((element, key) => {
                    return(
                        <>
                            <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                            
                        </>
                    )
                })
            }
        </div>
    )
};

export default UsersList