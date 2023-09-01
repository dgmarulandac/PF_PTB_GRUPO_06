import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';
import {logOut, postLogin} from "../../Redux/Action/action";
import * as navStyles from "./navStyles"
import styles from "./Nav.module.css"
import Swal from "sweetalert2";


const Nav = () => {

  const userSesion = useSelector((state) => state.userSesion);
  const dispatch = useDispatch();

  function handleCallbackResponse(response) {
    const user = { platform: "google", jwt: response.credential };
    dispatch(postLogin(user));
  }

  function errorMessage(response) {
    Swal.fire({
                title: "Error",
                text: `${response}`,
                icon: "error",
              });
  }

  if( Object.keys(userSesion).length === 0 ) {
    return(
      <nav className={navStyles.navClasses}>
        <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
          <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
          <div className={navStyles.linkContainerClasses}>
            <Link to="/login" ><button className={navStyles.buttonClasses}><span class="relative z-10">Inicia Sesión</span></button></Link>
            <Link to="/register" ><button className={navStyles.buttonClasses}><span class="relative z-10">Registrate</span></button></Link>
            <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
            <GoogleLogin onSuccess={handleCallbackResponse} onError={errorMessage}/>
          </div>
        </div>
        <div className={styles.rotatingBar}></div>
      </nav>
    );
  };

  let isAdmin = false;
  let isSeller = false;

  userSesion.roles.forEach( role => {
    isAdmin = isAdmin || role === "admin";
    isSeller = isSeller || role === "seller";
  });

  if( isSeller ) {
    return(
      <nav className={navStyles.navClasses}>
        <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
          <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
          <div className={navStyles.linkContainerClasses}>
            <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span class="relative z-10">Crear Evento</span></button></Link>
            <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
            <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y Condiciones</span></button></Link>
            <Link to='/myEvents'><button className={navStyles.buttonClasses}><span class="relative z-10">Mis Eventos</span></button></Link>
            <button className={navStyles.buttonClasses} onClick={() => {dispatch(logOut())}}><span class="relative z-10">Cerrar Sesión</span></button>
          </div>
        </div>
        <div className={styles.rotatingBar}></div>
      </nav>
    );
  };

  if( isAdmin ) {
    return(
      <nav className={navStyles.navClasses}>
        <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
          <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
          <div className={navStyles.linkContainerClasses}>
            <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span class="relative z-10">Crear Evento</span></button></Link>
            <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
            <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y condiciones</span></button></Link>
            <Link to='/myEvents'><button className={navStyles.buttonClasses}><span class="relative z-10">Mis Eventos</span></button></Link>
            <button className={navStyles.buttonClasses} onClick={() => {dispatch(logOut())}}><span class="relative z-10">Cerrar Sesión</span></button>
          </div>
        </div>
        <div className={styles.rotatingBar}></div>
      </nav>
    );
  };

  return(
    <nav className={navStyles.navClasses}>
      <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
        <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
        <div className={navStyles.linkContainerClasses}>
          <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
          <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y condiciones</span></button></Link>
          <Link to='/misCompras' ><button className={navStyles.buttonClasses}><span class="relative z-10">Mis compras</span></button></Link>
          <button className={navStyles.buttonClasses} onClick={() => {dispatch(logOut())}}><span class="relative z-10">Cerrar Sesión</span></button>
        </div>
      </div>
      <div className={styles.rotatingBar}></div>
    </nav>
  );
}

export default Nav;