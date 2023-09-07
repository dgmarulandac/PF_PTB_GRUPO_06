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
                        En el corazón de nuestra aplicación de venta de boletos para eventos, se encuentra un grupo de siete desarrolladores comprometidos con la creación de
                        una experiencia excepcional para nuestros usuarios. Cada miembro de nuestro equipo trae consigo un conjunto único de habilidades y experiencias que enriquecen nuestro enfoque.
                    </h1>
                </div>
            </div>

            <div className={style.containerSecond}>
                <div className={style.containerText}>
                    <h1 className={style.titleSecond}>Quiénes somos</h1>
                    <p className={style.parrafoSecond}>
                        Somos un equipo diverso de mentes creativas y apasionadas que comparten una visión común: hacer que la compra de boletos para eventos sea sencilla, accesible y emocionante,
                        por tal motivo nos enorgullece presentarte nuestra plataforma diseñada y construida con pasión por siete estudiantes del curso de SoyHenry.
                    </p>
                </div>

                <div className={style.titulo}>
                    <h1 className={style.titulito}>Tu Comodidad es Nuestra Prioridad</h1>
                </div>

                <div className={style.containerThird}>
                    <div className={style.title}>
                        <p className={style.parrafoSecond}>
                            Comprendemos que la adquisición de boletos para eventos puede ser un proceso abrumador. Por lo tanto,
                            nos esforzamos en simplificarlo y hacerlo lo más agradable posible. Valoramos tus comentarios y trabajamos
                            constantemente en mejoras para garantizar que tengas la mejor experiencia al comprar boletos en línea.
                        </p>
                    </div>
                </div>

                <div className={style.containerValues}>
                    <div className={style.containerText3}>
                        <h1 className={style.titleThird}>Nuestros Valores</h1>
                        <section className={style.valuesSection}>
                            <li>Integridad</li>
                            <li>Innovación</li>
                            <li>Colaboración</li>
                            <li>Excelencia</li>
                            <li>Compromiso</li>
                        </section>
                    <div />
                </div>

            </div>
        </div>

            <CardGroup />
    </div>
    );
};

export default AboutUs;