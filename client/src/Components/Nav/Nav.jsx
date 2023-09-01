import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from '@react-oauth/google';
import {logOut, postLogin} from "../../Redux/Action/action";
import * as navStyles from "./navStyles"
import styles from "./Nav.module.css"
import Swal from "sweetalert2";
import styled from "styled-components"

const Hamburguer = styled.div`
height: ${(props) => (props.isOpen ? '100vh' : '48px')};
transition: height 0.3s ease-in-out;
overflow: hidden;
`

const Nav = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleMenu = () => {
    console.log(isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }
  const userSesion = useSelector((state) => state.userSesion);
  const dispatch = useDispatch();
  const [showContainer, setShowContainer] = useState(false);
  const [windowWidth, setWindowWitdth] = useState(0);
  useEffect(() => {
    setWindowWitdth(window.innerWidth)
  }, [])

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
  useEffect(() => {
    //Auth de google - global google
    /* global google */
    google.accounts.id.renderButton(
      document.getElementById("singInDiv"),
      { theme: "outline", size: "large" }
    )
  }, [windowWidth])

  if (windowWidth <= 860) {
    if (Object.keys(userSesion).length === 0) {
      return (

        <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
          <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
            <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">

              <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
              <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
              </svg></button>
            </div>
            <div className={navStyles.linkContainerClassesMobile} id="container">
              <Link to="/login" ><button className={navStyles.buttonClasses}><span >Inicia Sesión</span></button></Link>
              <Link to="/register" ><button className={navStyles.buttonClasses}><span >Registrate</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span>Preguntas Frecuentes</span></button></Link>
              <div id='singInDiv' className={navStyles.googleButtonIconMobile}></div>
            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </Hamburguer>
      );
    };

    let isAdmin = false;
    let isSeller = false;

    userSesion.roles.forEach(role => {
      isAdmin = isAdmin || role === "admin";
      isSeller = isSeller || role === "seller";
    });

    if (isSeller) {
      return (
        <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
          <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
            <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">

              <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
              <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
              </svg></button>
            </div>
            <div className={navStyles.linkContainerClassesMobile} id="container">
              <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span >Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span >Preguntas Frecuentes</span></button></Link>
              <Link to='/TaC' ><button className={navStyles.buttonClasses}><span >Terminos y Condiciones</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses}><span >Mis Eventos</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span >Cerrar Sesión</span></button>

            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </Hamburguer>
      );
    };

    if (isAdmin) {
      return (
        <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
          <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
            <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">

              <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
              <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
              </svg></button>
            </div>
            <div className={navStyles.linkContainerClassesMobile} id="container">
              <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span >Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span >Preguntas Frecuentes</span></button></Link>
              <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y condiciones</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses}><span >Mis Eventos</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span >Cerrar Sesión</span></button>

            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </Hamburguer>
      );
    };

    return (
      <Hamburguer isOpen={isMenuOpen} className={navStyles.navClasses}>
        <div className={`${navStyles.containerClassesMobile} flex justify-between items-center`} id="navwrap">
          <div className="dark:border-gray-600 grid grid-cols-2 z-50 dark:bg-gray-900">

            <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
            <button className="place-self-end	mx-10" onClick={handleMenu}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" fill="white" viewBox="0 0 50 50">
              <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
            </svg></button>
          </div>
          <div className={navStyles.linkContainerClassesMobile} id="container">
            <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span >Preguntas Frecuentes</span></button></Link>
            <Link to='/TaC' ><button className={navStyles.buttonClasses}><span >Terminos y condiciones</span></button></Link>
            <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span >Cerrar Sesión</span></button>

          </div>
        </div>
        <div className={styles.rotatingBar}></div>
      </Hamburguer>
    );
  }
  else {
    if (Object.keys(userSesion).length === 0) {
      return (
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

    userSesion.roles.forEach(role => {
      isAdmin = isAdmin || role === "admin";
      isSeller = isSeller || role === "seller";
    });

    if (isSeller) {
      return (
        <nav className={navStyles.navClasses}>
          <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
            <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
            <div className={navStyles.linkContainerClasses}>
              <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span class="relative z-10">Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
              <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y Condiciones</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses}><span class="relative z-10">Mis Eventos</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span class="relative z-10">Cerrar Sesión</span></button>
            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </nav>
      );
    };

    if (isAdmin) {
      return (
        <nav className={navStyles.navClasses}>
          <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
            <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
            <div className={navStyles.linkContainerClasses}>
              <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span class="relative z-10">Crear Evento</span></button></Link>
              <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
              <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y condiciones</span></button></Link>
              <Link to='/myEvents'><button className={navStyles.buttonClasses}><span class="relative z-10">Mis Eventos</span></button></Link>
              <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span class="relative z-10">Cerrar Sesión</span></button>
            </div>
          </div>
          <div className={styles.rotatingBar}></div>
        </nav>
      );
    };

    return (
      <nav className={navStyles.navClasses}>
        <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
          <Link to="/" ><h3 className={navStyles.logoClasses}>BOHO</h3></Link>
          <div className={navStyles.linkContainerClasses}>
            <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">Preguntas Frecuentes</span></button></Link>
            <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y condiciones</span></button></Link>
            <button className={navStyles.buttonClasses} onClick={() => { dispatch(logOut()) }}><span class="relative z-10">Cerrar Sesión</span></button>
          </div>
        </div>
        <div className={styles.rotatingBar}></div>
      </nav>
    );
  }
}

export default Nav;