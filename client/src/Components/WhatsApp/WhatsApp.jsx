import React from "react";
import { BsWhatsapp } from "react-icons/bs";

export default function WhatsApp() {
    return (
        <a href="https://wa.me/573108252795" className="rounded-full text-4xl p-5 z-50 bg-green-500 text-white fixed bottom-[50px] right-[40px]" target="_blank">
            <BsWhatsapp/>
        </a>
    )
}