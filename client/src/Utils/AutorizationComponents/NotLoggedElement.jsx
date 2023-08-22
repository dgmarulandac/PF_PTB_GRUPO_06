import { useSelector } from "react-redux";
import Error404 from "../../Components/Error 404/Error404";

export default function NotLoggedElement({children}) {
    
    const userSesion = useSelector((state) => state.userSesion);

    if( Object.keys(userSesion).length === 0 ) {
        return(
            <div>
                {children}
            </div>
        );
    } else {
        return(
            <div>
                <Error404 />
            </div>
        );
    };
};