import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userValidations from "../../functions/Validations/loginValidation/validation";
import { useSelector, useDispatch } from "react-redux";
import video from "../../Utils/videos/backgroundLogin.mp4"
import styles from './login.module.css'

export default function Login() {
    const userSesion = useSelector(state => state.user)
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        displayName: '',
        password: ''
    })
    const [errors, setErrors] = useState([])

    function handleForm(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        setUsers({
            ...users,
            [name]: value
        })
    };
    function handleSubmit(e) {
        e.preventDefault();
        const { displayName, password } = users
        const errores = userValidations(displayName, password);
        setErrors(errores);
        if( errores.length === 0 ) {
            axios.post(`/users/login`, users)
                .then(data => {
                    console.log(data.data);
                    setResult(true);
                })
                .catch( reason => {
                    console.log(reason);
                    setResult(false);
                });
        }
    };
    useEffect(() => {
        if (result) {
            navigate('/')
        }
    }, [result])
    return (
        <div className={styles.Background}>
                            <div className={styles.titleContainer}>
                    <h1>BOHO</h1>
                    <p>¡¡Compra tus tickets seguro con nosotros!!</p>
                </div>
            <section>
                <video className={styles.Video} src={video} autoPlay muted loop />
                <div className={styles.center}>
                    <article>
                        <form onSubmit={handleSubmit}  className={styles.LoginWindow}>
                            <label htmlFor="">Usuario:</label>
                            <input className={styles.LoginInput} onChange={handleForm} type="text" placeholder="Jorgito17" name="displayName" />
                            <label htmlFor="">Contraseña:</label>
                            <input className={styles.LoginInput} onChange={handleForm} type="password" placeholder="*********" name="password" />
                            <button className={styles.LoginButton}>Iniciar Sesión</button>
                        </form>
                    </article>
                    <article>
                        <p className={styles.window}>¿No tienes cuenta?, <Link style={{ textDecoration: "none", color: "rgb(191, 132, 29)" }} to='/register'> Registrate </Link></p>
                    </article>
                </div>
            </section>
        </div>
    )
};