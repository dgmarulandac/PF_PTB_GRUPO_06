import React from "react";
import { SiFacebook, SiTwitter, SiInstagram } from "react-icons/si";
import { Link } from "react-router-dom"
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>Información</h3>
                    <ul>
                        <li>
                            <Link to = "/">Inicio</Link>
                        </li>
                        <li>
                            <a href='/nosotros'>Nosotros</a>
                        </li>
                        <li>
                            <a href='/contacto'>Contacto</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Categorías</h3>
                    <ul>
                        <li>
                            <Link to = "/FAQ">Preguntas frecuentes</Link>
                        </li>
                        <li>
                            <Link to = '/TaC'>Términos y condiciones</Link>
                        </li>
                        <li>
                            <Link to = "/">Eventos</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h3>Síguenos</h3>
                    <ul className={styles.socialIcons}>
                        <li>
                            <a
                                href='https://facebook.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <SiFacebook /> Facebook
                            </a>
                        </li>
                        <li>
                            <a
                                href='https://twitter.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <SiTwitter /> Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href='https://instagram.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <SiInstagram /> Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p className={styles.footerrr}>
                    © 2023 BOHO. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;