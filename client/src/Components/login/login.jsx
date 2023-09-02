import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userValidations from "../../functions/Validations/loginValidation/validation";
import { useSelector, useDispatch } from "react-redux";
import { postLogin } from "../../Redux/Action/action";
import { styles } from "./loginStyle";

export default function Login() {
    const dispatch = useDispatch();
    const [user, setUsers] = useState({
        displayName: '',
        password: ''
    })
    const {userSesion} = useSelector(state => state)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
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
        if (errores.length === 0) {
            const userToSend = { ...user, platform: "boho", jwt: "" };
            dispatch(postLogin(userToSend));
            // navigate("/")
        }
    };

    useEffect(()=>{
        if(Object.keys(userSesion).length > 0){
            navigate("/")
        }
    },[userSesion])
    
    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1 className={styles.logo}>BOHO</h1>
                <p className={styles.p}>¡¡Compra tus tickets seguro con nosotros!!</p>
            </div>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                <h5 className={styles.h5}>Inciar Sesion</h5>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Usuario:</label>
                        <input className={styles.input} onChange={handleForm} type="text" placeholder="Jorgito17" name="displayName" />
                    </div>
                    <div className={styles.div_ind}>
                       <label className={styles.label}>Contraseña:</label>
                    <input className={styles.input} onChange={handleForm} type="password" placeholder="*********" name="password" /> 
                    </div>
                    <button className={styles.button}>Iniciar Sesión</button>
                </form>
                <p className={styles.p}>¿No tienes cuenta?, <Link style={{ textDecoration: "none", color: "rgb(191, 132, 29)" }} to='/register'> Registrate </Link></p>
                <p className={styles.p}>¿Olvidaste tu contraseña?, <Link style={{ textDecoration: "none", color: "rgb(191, 132, 29)" }} to='/passwordReset'> Recupera tu contraseña </Link></p>
            </div>
        </div>
    )
};