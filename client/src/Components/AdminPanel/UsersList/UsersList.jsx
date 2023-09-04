import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { active } from "../../FAQs/Fstyles";
const UsersList = () => {
    const [users, setUsers] = useState([]);
    // const [ user, setUser ] = useState({})
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/users', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                setUsers(data)
            })
            .catch(error => {
                setErrors(error.response.data.error)
                navigate('/')
            })

    }, [])

    function handleBan(e) {
        const id = e.currentTarget.value
        const user = users.filter(element => element.id === id)[0];
        const target = {
            ...user,
            active: !user.active,
        };
        axios.put(`/users/toggleUser/${id}`, {}, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                console.log(data)
                setSuccess(`El usuario fue ${user.active? `Baneado` : `Desbaneado` }`)
                axios.get('/users', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
                .then(res => res.data)
                .then(data => {
                    setUsers(data)
                })
                .catch(error => {
                    setErrors(error.response.data.error)
                    navigate('/')
                })
            })
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center">

            <div className="flex w-1/2 flex-col justify-center">
                <h1 className="text-white ">Lista de usuarios activos</h1>
                {

                    errors ? <p>{`${errors}`}</p> : users?.filter(element => element.active === true).map((element, key) => {
                        return (
                            <div key={key++} className="odd:bg-gray-900 place-self-center p-5 m-2 w-[37rem] grid grid-cols-[1fr_2fr_0.2fr] border border-gray-200 rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
                                <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                                <button className="bg-red rounded-md p-3" value={element.id} onClick={handleBan}>Banear</button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex w-1/2 flex-col justify-cente">
                <h1 className="text-white">Lista de usuarios inactivos</h1>
                {

                    errors ? <p>{`${errors}`}</p> : users?.filter(element => element.active === false).map((element, key) => {
                        return (
                            <div key={key++} className="odd:bg-gray-900 place-self-center p-5 m-2 w-[37rem] grid grid-cols-[1fr_2fr_0.2fr] border border-gray-200 rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
                                <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                                <button className="bg-green rounded-md p-3" value={element.id} onClick={handleBan}>Desbanear</button>
                            </div>
                        )
                    })
                }
            </div>
            {
                success ?
                    <div className="absolute bg-slate-900 border-white-100 rounded-md border p-5"> 
                        <button onClick={() => { setSuccess(null) }}><p className="text-white">x</p></button>
                        <p className="text-white">{`${success}`}</p>
                    </div> : null
            }
        </div>
    )
};

export default UsersList