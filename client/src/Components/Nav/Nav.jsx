import { Link } from "react-router-dom"
import styles from "./Nav.module.css"


const Nav = () => {

    return(
    <div className={styles.Nav}>
        <h3>BOHO</h3>
        <div>
        <Link to = "/"><button>home</button></Link>
        <Link to = "/login"><button>login</button></Link>
        <Link to = '/register'><button>register</button></Link>
        <Link to = '/createEvent'><button>create event</button></Link>
        </div>
    </div>
    )
}

export default Nav