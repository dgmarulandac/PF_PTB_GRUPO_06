import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./GmailRecovery.module.css";
import axios from "axios";

function GmailRecovery() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleCodeChange = (event) => {
		setEmail(event.target.value);
	};

	const handleVerify = async (event) => {
		event.preventDefault();

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_GMAIL_RECOVERY}`,
				{
					email: email,
				}
			);

			if (res.data.success) {
				Swal.fire({
					icon: "success",
					title: "Email enviado con éxito!",
					text: "Revisa tú buzon",
				});
				navigate("/");
			} else {
				Swal.fire({
					icon: "warning",
					title: "Gmail no encontrado!",
					text: "Por favor, revisa el gmail y intenta nuevamente",
				});
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Oops... Algo salió mal",
				text: error.response.data.message,
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Gmail</div>
			<form className={styles.form} onSubmit={handleVerify}>
				<div className={styles.TextForm}>Email</div>
				<input
					type='email'
					value={email}
					className={styles.inputForm}
					onChange={handleCodeChange}
					placeholder='Ingresar email'
				/>
				<button type='submit' className={styles.authButton}>
					Enviar
				</button>
			</form>
		</div>
	);
}

export default GmailRecovery;