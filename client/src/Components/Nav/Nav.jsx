import { Link } from "react-router-dom"
import styles from "./Nav.module.css"
import { useEffect } from 'react';


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
    <div className={styles.Nav}>
        <h3>BOHO</h3>
        <div className={styles.button}>
        <Link to = "/"><button>Inicio</button></Link>
        <Link to = "/login"><button>Login</button></Link>
        <Link to = '/createEvent'><button>Crear evento</button></Link>
        <Link to = '/FAQ'><button>Preguntas</button></Link>
        <Link to = '/TaC'><button>Terminos y condiciones</button></Link>
        <button><div id='singInDiv'></div></button>
        </div>
    </div>
    )
}

export default Nav