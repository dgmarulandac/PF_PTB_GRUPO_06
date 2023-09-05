import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { putUserProfile } from '../../Redux/Action/action';
import styles from './userProfile.module.css'; // Importa los estilos CSS Modules

export default function UserProfile() {
    const user = useSelector(state => state.userSesion);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    // Estado inicial con valores vacíos
    const [editedUserData, setEditedUserData] = useState({
        displayName: '',
        name: '',
        password: '',
        email: '',
        typeOfUser: '',
        companyRut: '',
        address: '',
        nationality: '',
        phone: '',
    });

    useEffect(() => {
        // Asegúrate de que los datos del usuario estén disponibles
        if (user) {
            // Cargar los datos del usuario cuando estén disponibles
            console.log(user);
            setEditedUserData({ ...user });
        }
    }, [user]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newUserData = { ...editedUserData, [name]: value };
        setEditedUserData(newUserData);
    }

    const handleSaveClick = async () => {
        try {
            await dispatch(putUserProfile(editedUserData));
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.tittle}>Perfil de Usuario</h1>

            <div className={styles.labelContainer}>
                <label className={styles.label}>Usuario:</label>
                <input
                    type="text"
                    name="displayName"
                    value={editedUserData.displayName}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.input}
                />
            </div>
            <div className={styles.labelContainer}>
                <label className={styles.label}>Nombre completo:</label>
                <input
                    type="text"
                    name="name"
                    value={editedUserData.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.input}
                />
            </div>
            <div className={styles.labelContainer}>
                <label className={styles.label}>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    value={editedUserData.password}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.input}
                />
            </div>
            <div className={styles.labelContainer}>
                <label className={styles.label}>Email:</label>
                <input
                    type="text"
                    name="email"
                    value={editedUserData.email}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.input}
                />
            </div>
            <div className={styles.labelContainer}>
                <label className={styles.label}>Tipo de Usuario:</label>
                <select
                    name="typeOfUser"
                    value={editedUserData.typeOfUser}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={styles.select}
                >
                    <option value="Cliente">Cliente</option>
                    <option value="Empresa">Empresa</option>
                </select>
            </div>
            {editedUserData.typeOfUser === 'Empresa' && (
                <div className={styles.labelContainer}>
                    <label className={styles.label}>Rut:</label>
                    <input
                        type="text"
                        name="companyRut"
                        value={editedUserData.companyRut}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={styles.input}
                    />
                </div>
            )}
            <div className={styles.labelContainer}>
                <label className={styles.label}>Dirección:</label>
                <input
                    type="text"
                    name="address"
                    value={editedUserData.address}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.input}
                />
            </div>
            <div className={styles.labelContainer}>
                <label className={styles.label}>Nacionalidad:</label>
                <input
                    type="text"
                    name="nationality"
                    value={editedUserData.nationality}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.input}
                />
            </div>
            <div className={styles.labelContainer}>
                <label className={styles.label}>Teléfono:</label>
                <input
                    type="text"
                    name="phone"
                    value={editedUserData.phone}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.input}
                />
            </div>
        <div>
            <button onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}>
                {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
            </button>
        </div>
        </div>
    );
}
