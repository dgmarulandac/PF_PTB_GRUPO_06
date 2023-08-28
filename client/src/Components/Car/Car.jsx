import React from "react";
import { BsFillCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import localOrBack from "../../Utils/CreateShoppingCar/localOrBack";

export default function Car() {
    const {shoppingCar} = useSelector(state => state)
    let shoppingCarLocal = JSON.parse(localStorage.getItem('shoppingCar'))
    const {userSesion} = useSelector(state => state)
    const result = localOrBack(shoppingCarLocal, shoppingCar, userSesion)
    return (
        <div className="relative text-gray-900 dark:text-white text-xl ml-5 mr-3">
            {console.log(result)}
            <label><BsFillCartFill /> <span className="text-xs absolute flex justify-center items-center bottom-3 bg-orange-600 rounded-full w-3.5 h-3.5 left-3">{result}</span></label>
        </div>
    )
}