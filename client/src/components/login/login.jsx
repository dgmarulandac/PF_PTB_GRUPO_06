import React, { useState } from "react";
import './login.module.css';
import { Link } from "react-router-dom";
export function Login() {
    const [user, setUser] = useState({
        userName: '',
        userPassword: ''
    })
    function handleForm(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        setUser({
            ...user,
            [name]: [value]
        })
    };
    function handleSubmit(e) {
        
    };
    return (
        <section>
            <article>
                <form action="" on onSubmit={handleSubmit}>
                    <label htmlFor="">Usuario:</label>
                    <input type="text" name="userName" />
                    <label htmlFor="">Contraseña:</label>
                    <input type="password" name="userPassword" />
                    <button className="login_btn">Iniciar Seccion</button>
                </form>
            </article>
            <article>
                <p>¿No tienes cuenta?, <Link to='/register' /></p>
            </article>
        </section>
    )
};