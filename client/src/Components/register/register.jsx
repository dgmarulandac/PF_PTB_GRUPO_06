import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerValidation from "../../functions/Validations/registerValidation/validation";
import axios from "axios";
// import styles from './register.module.css'
import { styles } from "./registerStyle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Register() {
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        displayName: '',
        name: '',
        password: '',
        email: '',
        address: '',
        nationality: 'Argentina',
        phone: '',
    });
    const [listErrors, setListErrors] = useState([])
    const { country } = useSelector(state => state)
    function handleChange(e) {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setUsers({
            ...users,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { displayName, name, password, address, email, typeOfUser, phone, nationality } = users
        const errors = registerValidation(displayName, name, password, address, email, typeOfUser, phone, nationality)
        if (errors.length === 0) {

            axios.post(`/users/register`, users)

            .then(res => {
                if (res && res.data) {
                  const data = res.data;
                  document.getElementById('message').textContent = data.message;
                  document.getElementById('message').classList.remove(styles.showErrorMessage);
                  document.getElementById('message').classList.add(styles.showSussesMessage);
              
                  Swal.fire({
                    title: "Mensaje enviado",
                    text: "Su usuario ha sido creado satisfactoriamente y se ha enviado un correo de confirmación.",
                    icon: "success",
                  }).then(() => {
                    navigate("/");
                  });
                } else {
                  // Manejar el caso en el que la respuesta o res.data no están definidos.
                }
              })
              .catch(err => {
                document.getElementById('message').textContent = err.response.data.error;
                document.getElementById('message').classList.remove(styles.showSussesMessage);
                document.getElementById('message').classList.add(styles.showErrorMessage);
                document.getElementById('textContainer').classList.remove(styles.hide);
              });
        }
        else {
            setListErrors(errors)
        }
    }
    return (
        <div className={styles.body} >
            {
                listErrors.length > 0 ?
                    <div className={styles.errorPopUp}>
                        <button onClick={() => { setListErrors([]) }} className="CloseButton">x</button>
                        <ul>
                            {
                                listErrors?.map((element, key) => {
                                    return (
                                        <div key={key++}>
                                            <li>{element}</li>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    :
                    null
            }
            <div className={styles.header}>
                <h1 className={styles.logo}>BOHO</h1>
                <p className={styles.p}>¡Registrate ahora!</p>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.div_ind}>
                        <label for="usuario" className={styles.label}>Usuario:</label>
                        <input className={styles.input} type="text" name="displayName" onChange={handleChange} placeholder="Jorgito14" />
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label} for="Nombres">Nombre completo:</label>
                        <input className={styles.input} type="text" name="name" onChange={handleChange} placeholder="Juan Alberto Ramirez De Armas" />
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label} for="contrasena">Contraseña:</label>
                        <input className={styles.input} type="password" name="password" onChange={handleChange} placeholder="*********" />
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label} for="email">Email:</label>
                        <input className={styles.input} type="text" name="email" onChange={handleChange} placeholder="ejemplo@ejemplo.com" />
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label} for="direccion">Dirección:</label>
                        <input className={styles.input} name="address" placeholder="Debe ser asi: Bv.España 234, Madrid" onChange={handleChange} />
                    </div>
                    <div>
                        <div className={styles.div_ind}>
                            <label className={styles.label} for="nationality">Pais:</label>
                            <select name="nationality" className={styles.select}>
                                <option value="">-elige un pais-</option>
                                {country.map((c, i) => {
                                    return (<option name="nationality" key={i} value={c}>{c}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label} for="telefono">Telefono:</label>
                        <input className={styles.input} name="phone" type="number" placeholder="Numero de telefono" onChange={handleChange} />
                    </div>
                    <button className={styles.button}>Registrarse</button>
                    <div className={styles.div_ind} id="textContainer"><p className={styles.exito} id="message"></p></div>
                </form>
                <p className={styles.window}>Revisa nuestros <Link style={{ textDecoration: "none", color: "rgb(191, 132, 29)" }} to='/TaC'>terminos y condiciones</Link></p>
                <p className={styles.window}>¿Ya tienes cuenta?, <Link style={{ textDecoration: "none", color: "rgb(191, 132, 29)" }} to='/login'>Inicia Sesión</Link></p>
            </div>

        </div>
    );
};