import React from "react";
import style from "./AboutUs.module.css";
import Nav from "../../Components/Nav/Nav";
import CardGroup from "../CardGroup/CardGroup";

const AboutUs = () => {
    return (
        <div className="bg-gray-700">
            <div className="text-5xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500 font-bold mb-5">
                <h1>Nuestro equipo de Desarrolladores</h1>
            </div>

            <div >
                <div >
                    <p >
                        En el corazón de nuestra aplicación de venta de boletos para eventos, se encuentra un grupo de siete desarrolladores comprometidos con la creación de
                        una experiencia excepcional para nuestros usuarios. Cada miembro de nuestro equipo trae consigo un conjunto único de habilidades y experiencias que enriquecen nuestro enfoque.
                    </p>
                </div>
            </div>

            <div >
                <div>
                    <h1>Quiénes somos</h1>
                    <p>
                        Somos un equipo diverso de mentes creativas y apasionadas que comparten una visión común: hacer que la compra de boletos para eventos sea sencilla, accesible y emocionante,
                        por tal motivo nos enorgullece presentarte nuestra plataforma diseñada y construida con pasión por siete estudiantes del curso de SoyHenry.
                    </p>
                </div>

                <div >
                    <h1 >Tu Comodidad es Nuestra Prioridad</h1>
                </div>

                <div >
                    <div >
                        <p >
                            Comprendemos que la adquisición de boletos para eventos puede ser un proceso abrumador. Por lo tanto,
                            nos esforzamos en simplificarlo y hacerlo lo más agradable posible. Valoramos tus comentarios y trabajamos
                            constantemente en mejoras para garantizar que tengas la mejor experiencia al comprar boletos en línea.
                        </p>
                    </div>
                </div>

                <div >
                    <div >
                        <h1 >Nuestros Valores</h1>
                        <section >
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