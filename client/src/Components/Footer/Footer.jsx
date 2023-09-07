/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { SiFacebook, SiTwitter, SiInstagram } from "react-icons/si"; // Importa los íconos necesarios
import styles from "./Footer.module.css"; // Importa tus estilos CSS aquí

const Footer = () => {
  return (
    <footer className=" bg-white dark:bg-gray-900 absolute end-0 w-screen">
      <div className={"mx-auto w-full p-4 py-6 lg:py-8"}>
        <div className={"md:flex md:justify-between"}>
          <div className={"mb-6 md:mb-0"}>
            <a href="#" className={"flex items-center"}>
              <span
                className={
                  "font-bungee text-5xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500"
                }
              >
                BOHO
              </span>
            </a>
          </div>
          <div className={"grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3"}>
            <div>
              <h2
                className={
                  "mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                }
              >
                Información
              </h2>
              <ul className={"text-gray-500 dark:text-gray-400 font-medium"}>
                <li className={"mb-4"}>
                  <a href="/" className={"hover:underline"}>
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/about" className={"hover:underline"}>
                    Nosotros
                  </a>
                </li>
                <li>
                  <a href="/contacto" className={"hover:underline"}>
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2
                className={
                  "mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white"
                }
              >
                Categorías
              </h2>
              <ul className={"text-gray-500 dark:text-gray-400 font-medium"}>
                <li className={"mb-4"}>
                  <a href="/FAQ" className={"hover:underline"}>
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a href="/TaC" className={"hover:underline"}>
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a href="/" className={"hover:underline"}>
                    Eventos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr
        className={
          styles.rotatingBar
        }
      />
      <div className={"sm:flex sm:items-center sm:justify-between"}>
        <span
          className={"text-sm text-gray-500 sm:text-center dark:text-gray-400"}
        >
          © 2023 MiEmpresa. Todos los derechos reservados.
        </span>
        <div className={"flex mt-4 space-x-5 sm:justify-center mx-5 my-1 sm:mt-0"}>
          <a
            href="#"
            className={
              "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }
          >
            <SiFacebook className={"w-4 h-4"} />
            <span className={"sr-only"}>Facebook page</span>
          </a>
          <a
            href="#"
            className={
              "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }
          >
            <SiTwitter className={"w-4 h-4"} />
            <span className={"sr-only"}>Twitter page</span>
          </a>
          <a
            href="#"
            className={
              "text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }
          >
            <SiInstagram className={"w-4 h-4"} />
            <span className={"sr-only"}>Instagram page</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
