import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userValidations from "../../functions/Validations/loginValidation/validation";
import { useSelector, useDispatch } from "react-redux";
import { postLogin } from "../../Redux/Action/action";
import video from "../../Utils/videos/backgroundLogin.mp4"
import styles from './login.module.css'

export default function Login() {
    const dispatch = useDispatch();
    const userSesion = useSelector(state => state.userSesion)
    const navigate = useNavigate()
    const [user, setUsers] = useState({
        displayName: '',
        password: ''
    })
    const [errors, setErrors] = useState([])

    function handleForm(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        setUsers({
            ...user,
            [name]: value
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { displayName, password } = user
        const errores = userValidations(displayName, password);
        setErrors(errores);
        if( errores.length === 0 ) {
            const userToSend = { ...user, platform: "boho", jwt: "" };
            dispatch(postLogin(userToSend));
            localStorage.setItem(JSON.stringify(userToSend))
        }
    };
    useEffect(() => {
        if (Object.keys(userSesion).length) {
            navigate('/')
        }
    }, [userSesion])
    useEffect(()=>{
        if(localStorage.getItem('jwt')){
            const user = localStorage.getItem("user")
            const userToObj = JSON.parse(user)
            dispatch(postLogin(userToObj))
        }
    }, [])
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