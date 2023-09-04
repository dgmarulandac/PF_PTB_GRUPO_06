import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

const IsLoading = styled.img`
width: 50px;
height: 50px;
animation: girar 2s infinite linear;
`
const DetailUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([])
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get(`/users/id/${id}`, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                console.log(data)
                setUser(data)
                setRoles(data.roles)
            })
            .catch(err => {
                console.log(err)
                setError(err)
            })
    }, [id])
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [])
    const changeUser = () => {

        axios.put(`/users/update/${id}`, user, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            // User puede recibir: {displayName, active, name, phone, email, nationality, address, roles}
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

    if (isLoading === true) {
        return (
            <div className="grid justify-center items-center">
                <IsLoading src="https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-14.jpg" width="30px" alt="" />
                <p className="text-white">cargando...</p>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <Link to="/Admin/Panel"><button><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.24000000000000005"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button></Link>
                </div>
                <div className="grid justify-center gap-y-5">
                    <h1 className="text-white">{user.displayName}</h1>
                    <img src={user.image} className="place-self-center	" />
                    <h2 className="text-white">{user.name}</h2>
                    <input className="rounded-md" placeholder="Cambia Nombre" type="text" onChange={handleChange} name="name" />
                    <p className="text-white">{user.email}</p>
                    <input className="rounded-md" placeholder="Cambia Email" type="text" onChange={handleChange} name="email" />
                    <p className="text-white">{user.address ? user.address : "Agrega direccion"}</p>
                    <input className="rounded-md" placeholder="Cambia Direccion" type="text" onChange={handleChange} name="address" />
                    <p className="text-white">{user.phone ? user.phone : "No tiene numero agregado todavia"}</p>
                    <input className="rounded-md" placeholder="Cambiar numero de telefono" type="number" onChange={handleChange} name="phone" />
                    {/* checked={user?.roles.includes("admin")} */}
                    <div>
                        <div>
                        <label className="text-white">Admin:</label>
                        <input type="checkbox" name="admin" checked={user.roles.includes('admin')} onChange={handleCheck} />
                        </div>
                        <div>
                        <label className="text-white">Comprador:</label>
                        <input type="checkbox" name="buyer" checked={user.roles.includes('buyer')} onChange={handleCheck} />
                        </div>
                        <div>
                        <label className="text-white">Vendedor:</label>
                        <input type="checkbox" name="seller" checked={user.roles.includes('seller')} onChange={handleCheck} />
                        </div>
                    </div>
                    {/* <input type="radio" id="contactChoice1" name="contact" value="email" /> */}

                    <button onClick={changeUser} className="text-white bg-black border-solid border-white rounded-md p-2">Cambiar usuario</button>
                    {
                        success?.includes('Usuario cambiado') ?
                            <div className="absolute bg-black">
                                <button onClick={() => { setSuccess(null) }}>x</button>
                                <p>{`${success}`}</p>
                            </div> : null
                    }
                </div>
            </div>
        )
    }
};

export default DetailUser