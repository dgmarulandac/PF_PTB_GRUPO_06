import React, { useState } from "react";
import ActiveUsers from "./Lists/ActiveUsers";
import BannedUsers from "./Lists/BannedUsers";
const UsersList = () => {
    const [users, setUsers] = useState(true);
    function handleChange (){
        setUsers(!users)
    }
    return (

        <div>
            <select className="m-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onChange={handleChange}>
                <option value={true}>Usuarios activos</option>
                <option value={false}>Usuarios desactivados</option>
            </select>
            {users? <ActiveUsers /> : <BannedUsers /> }
        </div>
    )
};

export default UsersList