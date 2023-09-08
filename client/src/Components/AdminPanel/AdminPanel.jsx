import React, { useEffect, useState } from "react";
import UsersList from "./UsersList/UsersList";
import MyEvents from "./MyEvents/MyEvents";
import ReviewsPanel from "./ReviewsPanel/ReviewsPanel";
const AdminPanel = () => {
const [userOrEvent, SetUserOrEvent] = useState('true')
const handleChange = (e)=>{
    const {value} = e.target
    SetUserOrEvent(value)
}

useEffect(()=>{},[userOrEvent])
switch (userOrEvent) {
    case "users":
        return (
            <div className='min-h-screen bg-whithe dark:bg-fondoDark'>
                <select className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="" id="" onChange={handleChange}>
                <option value="events">Lista de Eventos</option>
                        <option value="users">Lista de Usuarios</option>
                        <option value="reviews">Lista de Reviews</option>
                </select>
                <UsersList />
    
            </div>
        )
        case "events":
            return (
                <div className='min-h-screen bg-whithe dark:bg-fondoDark'>
                    <select className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="" id="" onChange={handleChange}>
                    <option value="events">Lista de Eventos</option>
                        <option value="users">Lista de Usuarios</option>
                        <option value="reviews">Lista de Reviews</option>
                    </select>
                    <MyEvents />
        
                </div>
            )
        case "reviews":
            return (
                <div className='min-h-screen bg-whithe dark:bg-fondoDark'>
                    <select className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" name="" id="" onChange={handleChange}>
                        <option value="events">Lista de Eventos</option>
                        <option value="users">Lista de Usuarios</option>
                        <option value="reviews">Lista de Reviews</option>
                    </select>
                    <ReviewsPanel />
        
                </div>
            )
    default:
        return (
            <div className='min-h-[65%] md:min-h bg-whithe dark:bg-fondoDark grid gap-5 justify-center mt-10'>
                    <button className="p-5 h-20 text-white border-2 border-white rounded-md bg-sky-500 font-bold" value="events" onClick={handleChange}>Lista de Eventos</button>
                    <button className="p-5 h-20 text-white border-2 border-white rounded-md bg-sky-500 font-bold" value="users" onClick={handleChange}>Lista de Usuarios</button>
                    <button className="p-5 h-20 text-white border-2 border-white rounded-md bg-sky-500 font-bold" value="reviews" onClick={handleChange}>Lista de Reviews</button>
            </div>
        )
}

};

export default AdminPanel;