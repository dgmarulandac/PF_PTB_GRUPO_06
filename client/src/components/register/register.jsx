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
    function handleChange(e){
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setUser({
            ...user,
            [name]: [value]
        })
    }

    function handleSubmit(e){
        const [user, password, email, dir] = user
        const errors = registerValidation(user, password, email, dir)
        if(errors.lengh === 0){
            axios.post('http://localhost:3001/users')
                .then(res => res.data)
                .then(data => {
                    setResult(true)
                })
                .catch((err) => (setResult(err.message)))
        }
    }
    return (
        <section>
            <article>
                <form onSubmit={handleSubmit}>
                    <label for="usuario">Usuario:</label>
                    <input type="text"  name="user" onChange={handleChange} />

                    <label for="contrasena">Contraseña:</label>
                    <input type="password"  name="password" onChange={handleChange}/>

                    <label for="email">Email:</label>
                    <input type="email"  name="email" onChange={handleChange}/>

                    <label for="direccion">Dirección:</label>
                    <input  name="dir" placeholder="Debe ser asi: Bv.España 234, Madrid, España" onChange={handleChange}/>

                    <button>Registrarse</button>
                </form>
            </article>
        </section>
    );
};