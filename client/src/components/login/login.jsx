import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userValidations from "../../functions/Validations/loginValidation/validation";
import { useSelector, useDispatch } from "react-redux";


export function Login() {
    const userSesion = useSelector(state => state.userSesion)
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        user: '',
        password: ''
    })
    const [errors, setErrors] = useState([])
    const [result, setResult] = useState(false)
    function handleForm(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        setUsers({
            ...users,
            [name]: [value]
        })
    };
    function handleSubmit(e) {
        e.preventDefault();
        const { user, password } = users
        setErrors(userValidations(user, password))
    };
    useEffect(() => {
        if (errors.lenght < 1) {
            axios.post('http://localhsot:3001/user/login', users)
                .then(res => res.data)
                .then(data => {
                    setResult(true)
                })
        }
    }, [errors])
    useEffect(() => {
        if (result) {
            setTimeout(navigate('/'), 500)
            return (
                <div>
                    <p>Bienvenido</p>
                </div>
            )
        }
    }, [result])
    return (
        <section>
            {
                errors.length > 0 ?
                    <article>
                        <div>
                            {
                                errors?.map((element, key) =>{
                                    return(
                                        <div key={key++}>
                                            <p>{element}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </article>
                    :
                    null
            }
            <article>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Usuario:</label>
                    <input type="text" name="userName" />
                    <label htmlFor="">Contraseña:</label>
                    <input type="password" name="userPassword" />
                    <button className="login_btn">Iniciar Seccion</button>
                </form>
            </article>
            <article>
                <p>¿No tienes cuenta?, <Link to='/register'> Registrate </Link></p>
            </article>
        </section>
    )
};