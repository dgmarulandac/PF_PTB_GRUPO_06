import React, { useState } from "react";
import registerValidation from "../../functions/Validations/registerValidation/validation";
import axios from "axios";
export function Register() {
    const [user, setUser] = useState({
        user: '',
        password: '',
        email: '',
        dir: ''
    });
    const [result, setResult] = useState(false)
    const [errors, setErrors] = useState([])
    function handleChange(e) {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setUser({
            ...user,
            [name]: [value]
        })
    }

    function handleSubmit(e) {
        const [user, password, email, dir] = user
        const errors = registerValidation(user, password, email, dir)
        if (errors.lengh === 0) {
            axios.post('http://localhost:3001/users')
                .then(res => res.data)
                .then(data => {
                    setResult(true)
                })
                .catch((err) => (setResult(err.message)))
        }
        else {
            setErrors(errors)
        }
    }
    return (
        <section>
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
                errors ?
                    <div>
                        <button onClick={() => { setErrors([]) }}>x</button>
                        {
                            errors.map((element, key) =>{
                                return(
                                    <div>
                                        <p>{element}</p>
                                    </div>
                                )
                            })    
                        };
                    </div>
                    :
                    null
            }
            <article>
                <form onSubmit={handleSubmit}>
                    <label for="usuario">Usuario:</label>
                    <input type="text" name="user" onChange={handleChange} />

                    <label for="contrasena">Contraseña:</label>
                    <input type="password" name="password" onChange={handleChange} />

                    <label for="email">Email:</label>
                    <input type="email" name="email" onChange={handleChange} />

                    <label for="direccion">Dirección:</label>
                    <input name="dir" placeholder="Debe ser asi: Bv.España 234, Madrid, España" onChange={handleChange} />

                    <button>Registrarse</button>
                </form>
            </article>
        </section>
    );
};