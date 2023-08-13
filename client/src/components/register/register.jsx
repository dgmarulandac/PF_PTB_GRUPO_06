import React, { useEffect, useState } from "react";
import registerValidation from "../../functions/Validations/registerValidation/validation";
import axios from "axios";
import styles from './register.module.css'
import { Link } from "react-router-dom";
import video from "../../utils/videos/backgroundLogin.mp4"
export function Register() {
    const [users, setUsers] = useState({
        user: '',
        password: '',
        email: '',
        dir: '',
        country: ''
    });
    const [result, setResult] = useState(false)
    const [listErrors, setListErrors] = useState([])
    function handleChange(e) {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setUsers({
            ...users,
            [name]: [value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { user, password, dir, email } = users
        const errors = registerValidation(user, password, dir, email)
        if (errors.length === 0) {
            axios.post('http://localhost:3001/users/register', users)
                .then(res => res.data)
                .then(data => {
                    setResult(true)
                })
                .catch((err) => (setResult(err.message)))
        }
        else {
            setListErrors(errors)
        }
    }
    return (
        <section>
            <div className={`${styles.Background}`} >
            {
                result ?
                    <article>
                        <div>
                            <button onClick={() => { setResult(false) }}>x</button>
                            <p>Registro con exito</p>
                        </div>
                    </article>
                    :
                    null
            }
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
                    <input className={styles.RegisterInput} type="text" name="user" onChange={handleChange} />

                    <label for="contrasena">Contraseña:</label>
                    <input className={styles.RegisterInput} type="password" name="password" onChange={handleChange} />

                    <label for="email">Email:</label>
                    <input className={styles.RegisterInput} type="text" name="email" onChange={handleChange} />

                    <label for="direccion">Dirección:</label>
                    <input className={styles.RegisterInput} name="dir" placeholder="Debe ser asi: Bv.España 234, Madrid" onChange={handleChange} />

                    <label for="country">Pais:</label>
                    <div className={styles.select}>
                        <select onChange={handleChange}>
                            <option name="Argentina" value="Argentina">Argentina</option>
                            <option name="Venezuela" value="Venezuela">Venezuela</option>
                            <option name="Uruguay" value="Uruguay">Uruguay</option>
                            <option name="Colombia" value="Colombia">Colombia</option>
                            <option name="Chile" value="Chile">Chile</option>
                        </select>
                    </div>
                    <button className={styles.RegisterButton}>Registrarse</button>
                </form>
                
            </article>
            <article className="topGrid">
                <p className={styles.window}>¿Ya tienes cuenta?, <Link style={{textDecoration: "none", color: "rgb(191, 132, 29)"}} to='/login'>Inicia Seccion</Link></p>
            </article>
            </div>
            <video src={video} className={styles.Video} loop muted autoPlay/>
        </section>
    );
};