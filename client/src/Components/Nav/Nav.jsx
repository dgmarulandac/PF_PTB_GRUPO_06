import { Link } from "react-router-dom"
import { useEffect } from 'react';
import * as navStyles from "./navStyles"
import styles from "./Nav.module.css"


const Nav = () => {


    useEffect(()=>{
        //Auth de google - global google
        /* global google */
        google.accounts.id.renderButton(
        document.getElementById("singInDiv"),
        { theme: "outline", size: "large"}
        )
    },[])

    return(
<nav className={navStyles.navClasses}>
  <div className={`${navStyles.containerClasses} flex justify-between items-center`}>
    <h3 className={navStyles.logoClasses}>BOHO</h3>
    <div className={navStyles.linkContainerClasses}>
      <Link to="/" ><button 
      className={navStyles.buttonClasses}><span class="relative z-10">Inicio</span></button></Link>
      <Link to="/login" ><button className={navStyles.buttonClasses}><span class="relative z-10">Login</span></button></Link>
      <Link to='/createEvent' ><button className={navStyles.buttonClasses}><span class="relative z-10">crear evento</span></button></Link>
      <Link to='/FAQ' ><button className={navStyles.buttonClasses}><span class="relative z-10">preguntas</span></button></Link>
      <Link to='/TaC' ><button className={navStyles.buttonClasses}><span class="relative z-10">Terminos y condiciones</span></button></Link>
      <div id='singInDiv' className={navStyles.googleButtonIcon}></div>
    </div>
  </div>
  <div className={styles.rotatingBar}></div>
</nav>

    )
}

export default Nav