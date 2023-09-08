import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Paginado from "../../../pagination/pagination";
import * as styles from "../../../EventsDashboard/EventDashboardStiles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BannedUsers = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = ('');
    const [success, setSuccess] = ('');
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const ref = useRef();
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;

    const ultimoIndex = currentPage * eventsPerPage;
    const primerIndex = ultimoIndex - eventsPerPage;

    const [usuariosAMostrar, setUsuariosAMostrar] = useState([]);

    useEffect(() => {
        setCurrentPage(1);
    }, [users]);

    useEffect(() => {
        setUsuariosAMostrar(users.slice(primerIndex, ultimoIndex));
        console.log(usuariosAMostrar)
    }, [users, currentPage]);


    useEffect(() => {
        axios.get('/users', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(res => res.data)
            .then(data => {
                setUsers(data.filter(element => element.active === false))
                setAllUsers(data.filter(element => element.active === false))
            })
            .catch(error => {
                setErrors(error.response.data.error)
                navigate('/')
            })

    }, [])

    function handleSearch() {
        if (ref.current.value.length === 0) {
            setUsers(allUsers)
        } else {
            setUsers(users.filter(element => element.email === ref.current.value))
        }
    };
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
                axios.get('/users', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
                    .then(res => res.data)
                    .then(data => {
                        setUsers(data.filter(element => element.active === false))
                    })
                    .catch(error => {
                        setErrors(error.response.data.error)
                        navigate('/')
                    })
            })
    };
    return (
        <div>
            <div >
                <div>
                    <input className="rounded-l-md p-2" ref={ref} placeholder="Buscar un email" />
                    <button onClick={handleSearch} className="rounded-r-md p-2 bg-black" >Buscar</button>
                </div>
            </div>
            <div className="grid place-self-center">
                <h1 className="font-semibold text-xl text-gray-900 dark:text-white border-b-[3px] min-h-10 p-2">Lista de desactivados</h1>
                {
                    errors ? <p>{`${errors}`}</p> : usuariosAMostrar?.filter(element => element.active === false).map((element, key) => {
                        return (
                            <div key={key++} className="place-self-center p-5 m-2 w-[37rem] grid grid-cols-[80%_20%] border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
                                <Link to={`/Admin/Panel/${element.id}`}><p>{element.email}</p></Link>
                                <button className="bg-green-900 rounded-md py-2" value={element.id} onClick={handleBan}>Desbanear</button>

                            </div>
                        )
                    })
                }
                <Paginado
                    eventsPerPage={eventsPerPage}
                    events={users}
                    page={currentPage}
                    paginado={setCurrentPage}
                />
            </div>
        </div>
    )
}
export default BannedUsers;