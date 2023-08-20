import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./Verify.module.css";
import axios from "axios";

const Verify = () => {
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [cuil, setCuil] = useState("");
	const navigate = useNavigate();

	const handleNameChange = (event) => {
		setName(event.target.value);
	};
	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	};
	const handleCuilChange = (event) => {
		setCuil(event.target.value);
	};

	const handleVerify = async (event) => {
		event.preventDefault();

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_VERIFY_API}`,
				{
					name: name,
					lastName: lastName,
					cuil: cuil,
				}
			);
			if (res.data.success) {
				navigate("/selectRecoveryMethod", { state: { cuil } });
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops... Algo salio mal",
					text: res.data.message,
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
			<div className={styles.headerP}>Verificación</div>
			<form className={styles.formP} onSubmit={handleVerify}>
				<div className={styles.TextFormP}>Nombre</div>
				<input
					type='text'
					value={name}
					className={styles.inputFormP}
					onChange={handleNameChange}
					placeholder='Nombre'
				/>
				<div className={styles.TextFormP}>Apellido</div>
				<input
					type='text'
					value={lastName}
					className={styles.inputFormP}
					onChange={handleLastNameChange}
					placeholder='Apellido'
				/>
				<div className={styles.TextFormP}>Cuil</div>
				<input
					type='text'
					value={cuil}
					className={styles.inputFormP}
					onChange={handleCuilChange}
					maxLength='11'
					pattern='\d*'
					placeholder='Cuil'
				/>

				<button type='submit' className={styles.loginButtonP}>
					Verificacion
				</button>
			</form>
		</div>
	);
};

export default Verify;