import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerValidation from "../../functions/Validations/registerValidation/validation";
import axios from "axios";
import styles from './register.module.css'
import { Link } from "react-router-dom";
import video from "../../Utils/videos/backgroundLogin.mp4"

export default function Register() {
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
        isCompany: false,
    });
    const [result, setResult] = useState(0)
    const [listErrors, setListErrors] = useState([])
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
        const { displayName, name, password, address, email, typeOfUser, phone, nationality, isCompany } = users
        const errors = registerValidation(displayName, name, password, address, email, typeOfUser, phone, nationality)
        if (errors.length === 0) {

            axios.post(`/users/register`, users)

                .then(res => res.data)
                .then(data => {
                    document.getElementById('message').textContent = data.message;
                    document.getElementById('message').classList.remove(styles.showErrorMessage)
                    document.getElementById('message').classList.add(styles.showSussesMessage)
                    document.getElementById('textContainer').classList.remove(styles.hide)
                })
                .catch((err) => {
                    document.getElementById('message').textContent = err.response.data.error;
                    document.getElementById('message').classList.remove(styles.showSussesMessage)
                    document.getElementById('message').classList.add(styles.showErrorMessage)
                    document.getElementById('textContainer').classList.remove(styles.hide)
                })
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
                                <option name="nationality" value="Venezuela">Venezuela</option>
                                <option name="nationality" value="Uruguay">Uruguay</option>
                                <option name="nationality" value="Colombia">Colombia</option>
                                <option name="nationality" value="Chile">Chile</option>
                            </select>
                        </div>
                        <button className={styles.RegisterButton}>Registrarse</button>
                        <div className={styles.hide} id="textContainer"><p id="message"></p></div>
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