import React from "react";
import style from "./AboutUs.module.css";
import Nav from "../../Components/Nav/Nav";
import CardGroup from "../CardGroup/CardGroup";

const AboutUs = () => {
    return (
        <div className={style.container}>
            <div className={style.titulo}>
                <h1 className={style.titulito}>Nuestro equipo de Desarrolladores</h1>
            </div>
            <div className={style.containerFirst}>
                <div className={style.title}>
                    <h1 className={style.titleFirst}>
                        En el corazón de nuestra aplicación de venta de boletos para eventos, se encuentra un grupo de 7 desarrolladores comprometidos con la creación de
                        una experiencia excepcional para nuestros usuarios. Cada miembro de nuestro equipo trae consigo un conjunto único de habilidades y experiencias que enriquecen nuestro enfoque.
                    </h1>
                </div>
            </div>

            <div className={style.containerSecond}>
                <div className={style.containerText}>
                    <h1 className={style.titleSecond}>Quiénes somos</h1>
                    <p className={style.parrafoSecond}>
                        Somos un equipo diverso de mentes creativas y apasionadas que comparten una visión común:hacer que la compra de boletos para eventos sea sencilla, accesible y emocionante,
                        por tal motivo nos enorgullece presentarte nuestra plataforma diseñada y construida con pasión por siete estudiantes del curso de SoyHenry.
                    </p>
                </div>
                
                <section className={style.valuesSection}>
                    <h2>Nuestros Valores</h2>
                    <ul>
                        <li>Integridad</li>
                        <li>Innovación</li>
                        <li>Colaboración</li>
                        <li>Excelencia</li>
                        <li>Compromiso</li>
                    </ul>
                </section>
            </div>
            <p className={style.signature}>
                Atentamente EQUIPO BOHO
            </p>
            <CardGroup />
        </div>
    );
};

export default AboutUs;