import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putUserProfile } from "../../Redux/Action/action";
import styles from "./userProfile.module.css"; // Importa los estilos CSS Modules

export default function UserProfile() {
  const user = useSelector((state) => state.userSesion);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  // Estado inicial con valores vacíos
  const [editedUserData, setEditedUserData] = useState({
    displayName: "",
    name: "",
    password: "",
    email: "",
    typeOfUser: "",
    companyRut: "",
    address: "",
    nationality: "",
    phone: "",
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
  };

  const handleSaveClick = async () => {
    try {
      await dispatch(putUserProfile(editedUserData));
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="bg-gray-600 flex justify-center items-center">
      <form className="justify-center items-center box-content w-96 bg-gray-900 mb-5 mt-5 rounded-lg">
        <div className="mb-6 mt-3">
          <h1 className="text-2xl md:text-5xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500 font-bold mb-5">
            Perfil de Usuario
          </h1>

          <div className="m2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Usuario:
            </label>
            <input
              type="text"
              name="displayName"
              value={editedUserData.displayName}
              onChange={handleChange}
              readOnly={!isEditing}
              className="mx-auto shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className={styles.labelContainer}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nombre completo:
            </label>
            <input
              type="text"
              name="name"
              value={editedUserData.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className="mx-auto shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className={styles.labelContainer}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              value={editedUserData.password}
              onChange={handleChange}
              readOnly={!isEditing}
              className="mx-auto shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className={styles.labelContainer}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={editedUserData.email}
              onChange={handleChange}
              readOnly={!isEditing}
              className="mx-auto shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className={styles.labelContainer}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Dirección:
            </label>
            <input
              type="text"
              name="address"
              value={editedUserData.address}
              onChange={handleChange}
              readOnly={!isEditing}
              className="mx-auto shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className={styles.labelContainer}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nacionalidad:
            </label>
            <input
              type="text"
              name="nationality"
              value={editedUserData.nationality}
              onChange={handleChange}
              readOnly={!isEditing}
              className="mx-auto shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className={styles.labelContainer}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Teléfono:
            </label>
            <input
              type="text"
              name="phone"
              value={editedUserData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className="mx-auto shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <br />
          <div>
            <button className="text-white bg-blue-600 px-4 py-2 rounded relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-blue-500 to-green-500 before:transition-all before:duration-500 hover:text-white hover:shadow-green-500 hover:before:left-0 hover:before:w-full"
              onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}
            >
              <span className="relative">{isEditing ? "Guardar Cambios" : "Editar Perfil"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
