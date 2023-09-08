import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const ref = useRef()
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate()
    console.log(users)
    useEffect(() => {
        axios.get('/users', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                setUsers(data)
                setAllUsers(data)
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
                setSuccess(`El usuario fue ${user.active ? `Baneado` : `Desbaneado`}`)
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
    function handleSearch() {
        if (ref.current.value.length === 0) {
            setUsers(allUsers)
        } else {
            setUsers(users.filter(element => element.email === ref.current.value))
        }
    };
    return (
        <div className="grid gap-5 justify-center">
            <div>
                <div >
                    <div>
                        <input className="rounded-l-md p-2" ref={ref} placeholder="Buscar un email" />
                        <button onClick={handleSearch} className="rounded-r-md p-2 bg-black" >Buscar</button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2">

                <div>
                    <h1 className="font-semibold text-xl text-gray-900 dark:text-white border-b-[3px] p-2">Lista de activos</h1>
                    {
                        errors ? <p>{`${errors}`}</p> : users.filter(element => element.active === true).map((element, key) => {
                            return (
                                <div key={key++} className="place-self-center p-5 m-2 w-[37rem] grid grid-cols-[80%_20%] border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
                                    <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                                    <button className="bg-red-900 border rounded-md py-2" value={element.id} onClick={handleBan}>Banear</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <h1 className="font-semibold text-xl text-gray-900 dark:text-white border-b-[3px] p-2">Lista de desactivados</h1>
                    {
                        errors ? <p>{`${errors}`}</p> : users.filter(element => element.active === false).map((element, key) => {
                            return (
                                <div key={key++} className="place-self-center p-5 m-2 w-[37rem] grid grid-cols-[80%_20%] border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
                                    <Link to={`/Admin/Panel/${element.id}`}><p>{element.displayName}</p></Link>
                                    <button className="bg-green-900 rounded-md py-2" value={element.id} onClick={handleBan}>Desbanear</button>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                {
                    success ?
                        <div className="bg-cyan-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-20 rounded-md">
                            <button className="absolute top-0 right-2" onClick={() => { setSuccess(null) }}>x</button>
                            <p>{`${success}`}</p>
                        </div> : null
                }
            </div>
        </div>
    )
};

export default UsersList