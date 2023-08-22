import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { styles } from "./resetPasswordStyle";

export default function ResetPassword() {

    const [emails, setEmails] = useState({
        email1: "",
        email2: ""
    });
    const [error, setError] = useState({
        email1: "",
        email2: ""
    });
    
    const navigate = useNavigate();

    const validation = ({email1, email2}) => {
        let errorMail1 = "";
        let errorMail2 = "";
        const mailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        if( !mailRegex.test(email1) ) {
            errorMail1 = "El correo electronico ingresado no es valido.";
        }
        if( !mailRegex.test(email2) ) {
            errorMail2 = "El correo electronico ingresado no es valido."
        }
        
        if( email1 !== email2  ) {
            errorMail2 = "Los correos no coinciden."
        }

        return( {email1: errorMail1, email2: errorMail2} );
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newEmails = { ...emails, [name]: value };
        setError(validation(newEmails));
        setEmails(newEmails);
    }

    const handleVerify = (event) => {
		event.preventDefault();
        let pasa = true;
        Object.values(error).forEach( err => { 
            if( pasa ) pasa = err.length === 0;
        });
        if( pasa ) {
            axios.post("/password/verify", {email: emails.email1})
            .then( data => {
                Swal.fire({
					icon: "success", 
					title: "Restablecer contraseña",
					text: "Se le ha enviado un correo para restablecer la contraseña.",
				});
                setEmails({email1: "", email2: ""});
                navigate("/")
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
                    ¡Restablece tu Contraseña!
                </p>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleVerify}>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Correo electronico:</label>
                        <input type="email" name="email1" id="1"
                            placeholder="Correo Electronico..."
                            value={emails.email1} onChange={handleChange}
                            className={styles.input} />
                        <div>
                            {error.email1 && <p className={styles.error}>{error.email1}</p>}
                        </div>
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Repite el correo electronico:</label>
                        <input type="email" name="email2" id="2"
                            placeholder="Correo Electronico..."
                            value={emails.email2} onChange={handleChange}
                            className={styles.input} />
                        <div>
                            {error.email2 && <p className={styles.error}>{error.email2}</p>}
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>Restablecer Contraseña</button>
                </form>
            </div>
        </div>
    )
}