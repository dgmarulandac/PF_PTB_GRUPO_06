import React from "react";
import UsersList from "./UsersList/UsersList";
import MyEvents from "./MyEvents/MyEvents";
const AdminPanel = () => {

    return (
        <div className='bg-whithe dark:bg-fondoDark'>
            <div className="m-3">
                {/* <UsersList /> */}
                <MyEvents />
            </div>

        </div>
    )
};

export default AdminPanel;