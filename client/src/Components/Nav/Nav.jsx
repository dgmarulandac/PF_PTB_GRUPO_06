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
        <Link to = "/"><button>Home</button></Link>
        <Link to = "/login"><button>Login</button></Link>
        <Link to = '/register'><button>Register</button></Link>
        <Link to = '/createEvent'><button>Create Event</button></Link>
        <Link to = '/FAQ'><button>FAQ's</button></Link>
        <Link to = '/TaC'><button>Terms</button></Link>
        <div id='singInDiv'></div>
        </div>
    </div>
    )
}

export default Nav