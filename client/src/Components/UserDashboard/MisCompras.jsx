// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const MisCompras = () => {
//     const mySales = useSelector((state) => state.mySales);

//     return (
//         <div>
//             <h1>Mis Compras</h1>
//             {mySales.length === 0 ? (
//                 <p>No tienes compras realizadas.</p>
//             ) : (
//                 mySales.map((sale) => (
//                     <div key={sale.id}>
//                         <p>Evento: {sale.eventName}</p>
//                         <p>Precio: {sale.price}</p>
                     
//                     </div>
//                 ))
//             )}

//             <Link to='/'> <button> Back </button></Link>
//         </div>
//     );
// };

// export default MisCompras;
