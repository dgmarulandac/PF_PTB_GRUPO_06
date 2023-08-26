import React from "react";
import { BsFillCartFill } from "react-icons/bs";

export default function Car() {
    const prueba = 5
    return (
        <div className="relative text-gray-900 dark:text-white text-xl ml-5 mr-3">
            <label><BsFillCartFill /> <span className="text-xs absolute flex justify-center items-center bottom-3 bg-orange-600 rounded-full w-3.5 h-3.5 left-3">{prueba}</span></label>
        </div>
    )
}