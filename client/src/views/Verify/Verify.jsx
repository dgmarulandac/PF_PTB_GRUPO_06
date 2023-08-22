import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Verify.module.css";
//import { styles } from "./verifyStyle";
import axios from "axios";

const Verify = () => {
	const [user, setUser] = useState("");
	const navigate = useNavigate();

	const handleUserChange = (event) => {
		setUser(event.target.value);
	};

	const handleVerify = async (event) => {
		event.preventDefault();

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_VERIFY_API}`,
				{
					displayName: user,
				}
			);
			if (res.data.success) {
				navigate("/gmailRecovery");
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops... Algo salio mal",
					text: "No se pudo verificar su identidad.",
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
			<div className={styles.header}>
                <h1 className={styles.logo}>BOHO</h1>
                <p className={styles.p}>¡¡Restablece tu Contraseña!!</p>
            </div>
			<div className={styles.headerP}>Verificación</div>
			<form className={styles.formP} onSubmit={handleVerify}>
				<div className={styles.TextFormP}>Usuario</div>
				<input
					type='text'
					value={user}
					className={styles.inputFormP}
					onChange={handleUserChange}
					placeholder='User'
				/>
				<button type='submit' className={styles.loginButtonP}>
					Verificacion
				</button>
			</form>
		</div>
	);
};

export default Verify;