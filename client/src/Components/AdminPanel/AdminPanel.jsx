import React, { useEffect, useState } from "react";
import UsersList from "./UsersList/UsersList";
import MyEvents from "./MyEvents/MyEvents";
const AdminPanel = () => {
const [userOrEvent, SetUserOrEvent] = useState('true')
const handleChange = (e)=>{
    const {value} = e.target
    SetUserOrEvent(value)
}

useEffect(()=>{},[userOrEvent])
    return (
        <div className='bg-whithe dark:bg-fondoDark'>
            <select className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="" id="" onChange={handleChange}>
                <option value={true}>Lista de Eventos</option>
                <option value={false}>Lista de Usuarios</option>
            </select>
            {userOrEvent === 'true' ? (<MyEvents />):(<UsersList />)}
        </div>
    )
};

export default AdminPanel;