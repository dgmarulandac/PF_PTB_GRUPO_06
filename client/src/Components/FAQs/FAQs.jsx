import React, { useState } from "react";
import style from "./FAQs.module.css";
import video from "../../Utils/videos/backgroundLogin.mp4"

const faqData = [
    {
        question: "¿Cómo funciona BOHO?",
        answer: "BOHO es una plataforma de venta de boletos para eventos como conciertos, exposiciones, teatro, etc. Los organizadores pueden listar sus eventos y los usuarios pueden buscar y comprar boletos a través de nuestra plataforma.",
    },
    {
        question: "¿Cómo puedo registrarme en BOHO?",
        answer: "Para registrarte en BOHO, sigue estos pasos: ",
        steps: [
            "Ve a nuestra página de inicio en www.boho.com.",
            "Haz clic en el botón Registrarse en la esquina superior derecha.",
            "Completa el formulario de registro con tu información personal, como nombre, dirección de correo electrónico y contraseña.",
            "Haz clic en Registrarse para crear tu cuenta.",
            "¡Listo! Ahora puedes acceder a tu cuenta y comenzar a explorar y comprar boletos para eventos.",
        ],
    },
    {
        question: "¿Cuánto cuesta usar BOHO?",
        answer: "El uso básico de BOHO es gratuito para los usuarios. Sin embargo, los precios de los boletos para eventos se establecen por los organizadores del evento. Puedes obtener más información sobre los precios de los boletos en las páginas de los eventos individuales.",
    },
    {
        question: "¿Cómo puedo buscar eventos en BOHO?",
        answer: "Para buscar eventos en BOHO, sigue estos pasos: ",
        steps: [
            "Inicia sesión en tu cuenta de BOHO.",
            "Haz clic en la opción Eventos en tu Home.",
            "Ingresa los criterios de búsqueda, como Fecha, Ubicación, Tipo de evento.",
            "Haz clic en Buscar y se mostrarán los resultados de eventos que coincidan con tus criterios.",
            "Explora las opciones de eventos y haz clic en aquellos que te interesen para obtener más detalles y comprar boletos si deseas.",
        ],
    },
    {
        question: "¿Cómo puedo publicar un evento en BOHO?",
        answer: "Para publicar un evento en BOHO, sigue estos pasos: ",
        steps: [
            "Inicia sesión en tu cuenta de BOHO.",
            "Haz clic en la opción Publicar evento en tu Home.",
            "Completa el formulario de publicación de evento con detalles como título del evento, descripción, ubicación, fecha, precio.",
            "Revisa la información y haz clic en Publicar para que tu evento esté disponible para los usuarios.",
        ],
    },
    {
        question: "¿Cómo puedo eliminar mi cuenta de BOHO?",
        answer: "Si deseas eliminar tu cuenta de BOHO, comunícate con @bohosupport y te ayudaremos.",
    },
];

function FAQ({ setValidateState, setCurrentUserStore2 }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <div className={style.container}>
            <video src={video} className={style.videoBackground} loop muted autoPlay />
            <div className={style.title}>
                <h2 className={style.titulito}>Preguntas frecuentes</h2>
            </div>
            <div className={style.Preguntas}>
                <div>
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`${style.card} ${activeIndex === index ? style.active : ""
                                }`}
                            onClick={() => handleToggle(index)}
                        >
                            <h2>{faq.question}</h2>
                            {activeIndex === index && (
                                <div>
                                    <p>{faq.answer}</p>
                                    {faq.steps && (
                                        <ol>
                                            {faq.steps.map(
                                                (step, stepIndex) => (
                                                    <li key={stepIndex}>
                                                        {step}
                                                    </li>
                                                )
                                            )}
                                        </ol>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQ;