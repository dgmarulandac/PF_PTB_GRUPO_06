import React from "react";
import UsersList from "./UsersList/UsersList";
import MyEvents from "./MyEvents/MyEvents";
const AdminPanel = () => {

    return (
        <div className='bg-whithe dark:bg-fondoDark'>
                {/* <UsersList /> */}
                <MyEvents />
        </div>
    )
};

export default AdminPanel;