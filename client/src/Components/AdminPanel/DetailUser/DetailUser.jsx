import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([])
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        axios.get(`/users/${id}`,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                setUser(data)
                setRoles(data.roles)
            })
            .catch(err => {
                setError(err)
            })
    }, [id])
    const changeUser = () => {

        axios.put(`/users/update/${id}`, user,{ headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
                // User puede recibir: {displayName, name, phone, email, nationality, address, roles}
            .then(res => res.data)
            .then(data => {
                setSuccess('Usuario cambiado')
            })
    };
    const handleChange = (e) => {
        const { value, name } = e.currentTarget;
        setUser({
            ...user,
            [name]: value
        })
    };
    const handleCheck = (e) => {
        const { checked, name } = e.currentTarget;
        if (checked) {
            setRoles([...roles, name])
        } else {
            setRoles(roles.filter((role) => role !== name))
        }
        setUser({
            ...user,
            roles: roles
        })
    }

    return (
        <div>
            <div>
                <h1>{user.displayName}</h1>
                <img src={user.image} />
                <h2>{user.name}</h2>
                <input type="text" onChange={handleChange} name="name" />
                <p>{user.email}</p>
                <input type="text" onChange={handleChange} name="email" />
                <p>{user.address}</p>
                <input type="text" onChange={handleChange} name="address" />
                <p>{user.phone}</p>
                <input type="number" onChange={handleChange} name="address" />

                <input type="checkbox" name="admin" checked={user.roles.includes("admin")} onChange={handleCheck} />
                <input type="checkbox" name="buyer" checked={user.roles.includes("buyer")} onChange={handleCheck} />
                <input type="checkbox" name="seller" checked={user.roles.includes("seller")} onChange={handleCheck} />
                {/* <input type="radio" id="contactChoice1" name="contact" value="email" /> */}

                <button onClick={changeUser}>Cambiar usuario</button>
                {
                    success.includes('Usuario cambiado') ?
                        <div>
                            <button>x</button>
                            <p>{`${success}`}</p>
                        </div> : null
                }
            </div>
        </div>
    )
};