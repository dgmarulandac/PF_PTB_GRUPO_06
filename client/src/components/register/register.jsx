import React, { useState } from "react";
import registerValidation from "../../functions/Validations/registerValidation/validation";

export function Register() {
    const [user, setUser] = useState({
        user: '',
        password: '',
        email: '',
        dir: ''
    });
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
        registerValidation(user, password, email, dir)
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