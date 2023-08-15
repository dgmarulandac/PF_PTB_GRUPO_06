import { Link } from "react-router-dom"

const Nav = () => {

    return(
    <div >
        <Link to = "/"><button>home</button></Link>
        <Link to = "/login"><button>login</button></Link>
        <Link to = '/register'><button>register</button></Link>
        <Link to = '/createEvent'><button>create event</button></Link>
    </div>
    )
}

export default Nav