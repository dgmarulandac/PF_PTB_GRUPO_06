import { Link } from "react-router-dom"
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import * as navStyles from "./navStyles"
import styles from "./Nav.module.css"


const Nav = () => {

  const userSesion = useSelector((state) => state.userSesion);

  useEffect(()=>{
      //Auth de google - global google
      /* global google */
      google.accounts.id.renderButton(
      document.getElementById("singInDiv"),
      { theme: "outline", size: "large"}
      )
  },[])

  if( Object.keys(userSesion).length === 0 ) {
    return(
      <nav className={navStyles.navClasses}>
        <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
          <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
          <div className={navStyles.linkContainerClasses}>
            <Link to="/login" ><button className={navStyles.buttonClasses}><span class="relative z-10">Inicia Sesión</span></button></Link>
            <Link to="/register" ><button className={navStyles.buttonClasses}><span class="relative z-10">Registrate</span></button></Link>
            <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
            <div id='singInDiv' className={navStyles.googleButtonIcon}></div>
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
        </div>
      </div>
      <div className={styles.rotatingBar}></div>
    </nav>
  );
}

export default Nav