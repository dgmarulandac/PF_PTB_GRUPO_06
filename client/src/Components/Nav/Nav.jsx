import { Link } from "react-router-dom"
import styles from "./Nav.module.css"


const Nav = () => {

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
        </div>
    </div>
    )
}

export default Nav