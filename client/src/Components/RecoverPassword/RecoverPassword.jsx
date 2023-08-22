import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { styles } from "./recoverPasswordStyle";

export default function RecoverPassword() {

    const { token } = useParams();

    const [passwords, setPasswords] = useState({
        password1: "",
        password2: ""
    });
    const [error, setError] = useState({
        password1: "",
        password2: ""
    });
    
    const navigate = useNavigate();

    const validation = ({password1, password2}) => {
        let errorPassword1 = "";
        let errorPassword2 = "";
        
        if( password1 !== password2  ) {
            errorPassword2 = "Las contraseñas no coinciden."
        }

        return( {password1: errorPassword1, password2: errorPassword2} );
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newPasswords = { ...passwords, [name]: value };
        setError(validation(newPasswords));
        setPasswords(newPasswords);
    }

    const handleVerify = (event) => {
		event.preventDefault();
        let pasa = true;
        Object.values(error).forEach( err => { 
            if( pasa ) pasa = err.length === 0;
        });
        if( pasa ) {
            axios.post("/recover", {password: passwords.password1, token: token})
            .then( data => {
                Swal.fire({
					icon: "success", 
					title: "Restablecer contraseña",
					text: "La contraseña se ha cambiado satisfactoriamente.",
				});
                setPasswords({password1: "", password2: ""});
                navigate("/login")
            })
            .catch( reason => {
                Swal.fire({
                    title: "Error",
                    text: `${reason.response.data.error}`,
                    icon: "error",
                });
            });
        } 
    }

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1 className={styles.logo}>BOHO</h1>
                <p className={styles.p}>
                    ¡Recupera tu Contraseña!
                </p>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleVerify}>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Ingresa una nueva Contraseña:</label>
                        <input type="password" name="password1" id="1"
                            placeholder="Contraseña..."
                            value={passwords.password1} onChange={handleChange}
                            className={styles.input} />
                        <div>
                            {error.password1 && <p className={styles.error}>{error.password1}</p>}
                        </div>
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Repite la contraseña:</label>
                        <input type="password" name="password2" id="2"
                            placeholder="Contraseña..."
                            value={passwords.password2} onChange={handleChange}
                            className={styles.input} />
                        <div>
                            {error.password2 && <p className={styles.error}>{error.password2}</p>}
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>Recuperar Contraseña</button>
                </form>
            </div>
        </div>
    )
}