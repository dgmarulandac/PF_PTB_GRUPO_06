import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LoggedElement({children}) {
    
    const userSesion = useSelector((state) => state.userSesion);

    if( Object.keys(userSesion).length === 0 ) {
        return(
            <div>
                <h2>ERROR 404: Página no encontrada</h2>
                <Link to={`/login`} ><p>Inicia Sesion Para continuar</p></Link>
            </div>
        );
    } else {
        return(
            <div>
                {children}
            </div>
        );
    };
};