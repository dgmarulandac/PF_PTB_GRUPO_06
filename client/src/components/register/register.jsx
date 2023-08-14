import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerValidation from "../../functions/Validations/registerValidation/validation";
import axios from "axios";
import styles from './register.module.css'
import { Link } from "react-router-dom";
import video from "../../utils/videos/backgroundLogin.mp4"
export function Register() {
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        displayName: '',
        name: '',
        password: '',
        email: '',
        typeOfUser: '',
        companyRut: '',
        address: '',
        nationality: 'Argentina',
        phone: '',
    });
    const [result, setResult] = useState(0)
    const [listErrors, setListErrors] = useState([])
    function handleChange(e) {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        console.log(users)
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

            axios.post('https://pf-grupo06-back.onrender.com/users/register', users)

                .then(res => res.data)
                .then(data => {
                    setResult(1)
                })
                .catch((err) => (setResult(2)))
        }
        else {
            setListErrors(errors)
        }
    }
    return (
        <section>
            <div className={`${styles.Background}`} >
                {
                    listErrors.length > 0 ?
                        <div className={styles.ErrorPopUp}>
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
                <div className={styles.titleContainer}>
                    <h1>BOHO</h1>
                    <p>¡¡Compra tus tickets seguro con nosotros!!</p>
                </div>

                <article className={styles.window}>
                    <form className={styles.Form} onSubmit={handleSubmit}>
                        <label for="usuario">Usuario:</label>
                        <input className={styles.RegisterInput} type="text" name="displayName" onChange={handleChange} placeholder="Jorgito14" />

                        <label for="Nombres">Nombre completo:</label>
                        <input className={styles.RegisterInput} type="text" name="name" onChange={handleChange} placeholder="Juan Alberto Ramirez De Armas" />

                        <label for="contrasena">Contraseña:</label>
                        <input className={styles.RegisterInput} type="password" name="password" onChange={handleChange} placeholder="*********" />

                        <label for="email">Email:</label>
                        <input className={styles.RegisterInput} type="text" name="email" onChange={handleChange} placeholder="ejemplo@ejemplo.com" />

                        <div>
                            <label htmlFor="typeOfUser">Usuario:</label>
                            <div>
                                <input type="radio" id="clientRadio" name="typeOfUser" value="Cliente" onChange={handleChange} />
                                <label htmlFor="clientRadio">Cliente</label>

                                <input type="radio" id="companyRadio" name="typeOfUser" value="Empresa" onChange={handleChange} />
                                <label htmlFor="companyRadio">Empresa</label>
                                {
                                    users.typeOfUser === 'Empresa' ?
                                    <div style={{display: 'grid'}}>
                                        <label htmlFor="companyRut">Rut:</label>
                                        <input className={styles.RegisterInput} type="number" id="companyRut" name="companyRut" placeholder="Rut de la compania (no es oblicatorio)" onChange={handleChange} />
                                    </div>
                                        :
                                        null
                                }
                            </div>
                        </div>

                        <label for="direccion">Dirección:</label>
                        <input className={styles.RegisterInput} name="address" placeholder="Debe ser asi: Bv.España 234, Madrid" onChange={handleChange} />

                        <label for="telefono">Telefono:</label>
                        <input className={styles.RegisterInput} name="phone" type="number" placeholder="Numero de telefono" onChange={handleChange} />


                        <label for="nationality">Pais:</label>
                        <div className={styles.select}>
                            <select name="nationality" onChange={handleChange}>
                                <option name="nationality" value="Argentina">Argentina</option>
                                <option name="Venecountryzcountryuela" value="Venezuela">Venezuela</option>
                                <option name="nationality" value="Uruguay">Uruguay</option>
                                <option name="nationality" value="Colombia">Colombia</option>
                                <option name="nationality" value="Chile">Chile</option>
                            </select>
                        </div>
                        <button className={styles.RegisterButton}>Registrarse</button>
                        {
                            result ?
                                result === 1 ?
                                    <div><p style={{ color: "green", textAlign: "center" }}>Registro con exito</p></div>

                                    :
                                    <p style={{ color: "red", textAlign: "center" }}>hubo un error por favor notifique al serivcio tecnico</p>
                                :
                                null
                        }
                    </form>

                </article>
                <article className="topGrid">
                    <p className={styles.window}>¿Ya tienes cuenta?, <Link style={{ textDecoration: "none", color: "rgb(191, 132, 29)" }} to='/login'>Inicia Sesión</Link></p>
                </article>
            </div>
            <video src={video} className={styles.Video} loop muted autoPlay />
        </section>
    );
};