import { useSelector } from "react-redux";
import Error404 from "../../Components/Error 404/Error404";

export default function SellerOrAdminElement({children}) {
    
    const userSesion = useSelector((state) => state.userSesion);

    if( Object.keys(userSesion).length === 0 ) {
        return(
            <div>
                <Error404 />
            </div>
        );
    }

    let isAdmin = false;
    let isSeller = false;

    userSesion.roles.forEach( role => {
        isAdmin = isAdmin || role === "admin";
        isSeller = isSeller || role === "seller";
    });

    if( isAdmin || isSeller ) {
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
    }

};