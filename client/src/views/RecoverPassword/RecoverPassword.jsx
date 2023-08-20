import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverPassword.module.css"
import Swal from "sweetalert2";

const RecoverPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

    const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const res = await axios.post(
				`http://localhost:3001/recover/${token}`,
				{
					password: password,
				}
			);
			if (res.data.success) {
				Swal.fire({
					icon: "success",
					title: "Contraseña cambiada",
					text: "Contraseña cambiada con éxito.",
				});
				navigate("/");
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops... Algo salio mal",
					text: res.status.data.message,
				});
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: error.message,
			});
		}
	};

    return (
		<div className={styles.containerP}>
			<div className={styles.headerP}>Cambiar contraseña</div>
			<form className={styles.formP} onSubmit={handleSubmit}>
				<div className={styles.TextFormP}>Contraseña</div>
				<input
					type='text'
					value={password}
					className={styles.inputFormP}
					onChange={handlePasswordChange}
					placeholder='Contraseña'
				/>

				<button type='submit' className={styles.loginButtonP}>
					Verificacion
				</button>
			</form>
		</div>
	);
}

export default RecoverPassword;