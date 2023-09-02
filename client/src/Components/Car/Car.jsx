import React, { useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
// import localOrBack from "../../Utils/CreateShoppingCar/localOrBack";
import CarModal from "./CarModal/CarModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCar } from "../../Redux/Action/action";

export default function Car() {
    const {shoppingCar} = useSelector(state => state)
    let shoppingCarLocal = localStorage.getItem('shoppingCar')
    const {userSesion} = useSelector(state => state)
    // const result = localOrBack(shoppingCarLocal, shoppingCar, userSesion)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()

    useEffect(()=>{
        findOrCreateCar()
    }, [])
    const findOrCreateCar = ()=>{
        if(shoppingCarLocal){
            axios.get(`/carts/${shoppingCarLocal}`, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(response => {
                console.log(response)
                localStorage.setItem('shoppingCar', response.data.token)
                dispatch(addCar(response.data.Events))})
            .catch(error => console.log(error))
        }else{
            axios.post(`/carts/createCart`, {items: shoppingCar}, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(({data}) =>{
                console.log(data)
                localStorage.setItem('shoppingCar', data.token)
                dispatch(addCar(data.events))
            })
        }
    }
    

    const handleModal = ()=>{
        setModal(!modal)
    }
    return (
        <div className="relative text-gray-900 dark:text-white text-xl m-3">
            <button onClick={handleModal}><BsFillCartFill /> <span className="text-xs absolute flex justify-center items-center bottom-3 bg-orange-600 rounded-full w-3.5 h-3.5 left-3">{shoppingCar?.length}</span></button>
            {modal && <CarModal handleModal={handleModal}/>}
        </div>
    )
}