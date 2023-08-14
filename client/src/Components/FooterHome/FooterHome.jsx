import React from "react";
import { SiFacebook, SiTwitter, SiInstagram } from "react-icons/si";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.footerSection}>
					<h3>Información</h3>
					<ul>
						<li>
							<a href='/inicio'>Inicio</a>
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
							<a href='/FAQs'>Preguntas frecuentes</a>
						</li>
						<li>
							<a href='/terminosycondiciones'>
								Términos y condiciones
							</a>
						</li>
						<li>
							<a href='/eventos'>Eventos</a>
						</li>
					</ul>
				</div>
				<div className={styles.footerSection}>
					<h3>Síguenos</h3>
					<ul className={styles.socialIcons}>
						<li>
							<a
								href='https://twitter.com/'
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
								href='https://twitter.com/'
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
				<p>
					© 2023 BOHO. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	);
};

export default Footer;