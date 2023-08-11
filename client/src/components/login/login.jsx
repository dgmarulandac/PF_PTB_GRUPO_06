import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userValidations from "../../functions/Validations/loginValidation/validation";
export function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        user: '',
        password: ''
    })
    const [errors, setErrors] = useState([])
    const [result, setResult] = useState(false)
    function handleForm(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        setUser({
            ...user,
            [name]: [value]
        })
    };
    function handleSubmit(e) {
        e.preventDefault();
        const {user, password} = user
        setErrors(userValidations(user, password))
    };
    useEffect(()=>{
        if(errors.lenght < 1){
            axios.post('http://localhsot:3001/user/login', user)
                .then(res => res.data)
                .then(data =>{
                    setResult(true)
                })
        }
    }, [errors])
    useEffect(()=>{
        if(result){
            setTimeout(navigate('/'), 500)
            return(
                <div>
                    <p>Bienvenido</p>
                </div>
            )
        }
    }, [result])
    return (
        <section>
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