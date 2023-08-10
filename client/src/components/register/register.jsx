import React, { useEffect, useState } from "react";
import registerValidation from "../../functions/Validations/registerValidation/validation";
import axios from "axios";
import styles from './register.module.css'
import { Link } from "react-router-dom";

export function Register() {
    const [users, setUsers] = useState({
        user: '',
        password: '',
        email: '',
        dir: ''
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
            axios.post('http://localhost:3001/users')
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
    useEffect(()=>{console.log(listErrors)}, [listErrors])
    return (
        <section className={styles.RegisterWindow}>
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
                listErrors ?
                    <div className={styles.ErrorPopUp}>
                        {
                            listErrors?.map((element, key) => {
                                return (
                                    <div key={key++}>
                                        <button onClick={() => { setListErrors([]) }} className="CloseButton">x</button>
                                        <p>{element}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    null
            }
            <article>
                <form className={styles.Form} onSubmit={handleSubmit}>
                    <label for="usuario">Usuario:</label>
                    <input type="text" name="user" onChange={handleChange} />

                    <label for="contrasena">Contraseña:</label>
                    <input type="password" name="password" onChange={handleChange} />

                    <label for="email">Email:</label>
                    <input type="text" name="email" onChange={handleChange} />

                    <label for="direccion">Dirección:</label>
                    <input name="dir" placeholder="Debe ser asi: Bv.España 234, Madrid, España" onChange={handleChange} />

                    <button>Registrarse</button>
                </form>
                
            </article>
            <article>
                <p>¿Ya tienes cuenta?, <Link to='/login'>Inicia Seccion</Link></p>
            </article>
        </section>
    );
};