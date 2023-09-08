import style from './CardGroup.module.css';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import * as styles from "./stylescard"

const CardsGroup = () => {
	const arrayGroup = [
		{
			id: 1,
			name: "Gabriel",
			lastname: "Sarmiento",
			github: "https://github.com/gabo963",
			linkedin: "https://www.linkedin.com/in/gabrielsarmientot ",
			photo: "https://avatars.githubusercontent.com/u/104466860?v=4",
			role: "Desarrollador Back-end",
		},
		{
			id: 2,
			name: "Daniel",
			lastname: "Marulanda",
			github: "https://github.com/dgmarulandac",
			linkedin: "https://www.linkedin.com/in/danielgustavomarulandacruz ",
			photo: "https://avatars.githubusercontent.com/u/54507534?v=4",
			role: "Desarrollador Back-end",
		},
		{
			id: 3,
			name: "Daniel",
			lastname: "Lopez",
			github: "https://github.com/Daniellg94",
			linkedin: "https://www.linkedin.com/in/daniel-lopez-gallego-89a358185/ ",
			photo: "https://avatars.githubusercontent.com/u/123106112?v=4",
			role: "Desarrollador Front-end",
		},
		{
			id: 4,
			name: "Cristian",
			lastname: "Massa",
			github: "https://github.com/Cristian-Massa",
			linkedin: "https://www.linkedin.com/in/cristian-massa",
			photo: "https://avatars.githubusercontent.com/u/109998938?v=4",
			role: "Desarrollador Front-end",
		},
		{
			id: 5,
			name: "Hector Luis",
			lastname: "Rivero",
			github: "https://github.com/hlrivero18",
			linkedin: "https://www.linkedin.com/in/hector-luis-rivero-311578260/",
			photo: "https://avatars.githubusercontent.com/u/79018226?v=4",
			role: "Desarrollador Front-end",
		},
		{
			id: 6,
			name: "Cecilia",
			lastname: "Castellano",
			github: "https://github.com/ceci-cast",
			linkedin:"https://www.linkedin.com/in/cecilia-margarita-castellano-rodriguez-44b026109/",
			photo: "https://avatars.githubusercontent.com/u/115096053?v=4",
			role: "Desarrollador Back-end",
		},
		{
			id: 7,
			name: "Gian Franco",
			github: "https://github.com/Giann92",
			linkedin: "in/gian-franco-javier-desumma-7b4206153",
			photo: "https://avatars.githubusercontent.com/u/56614039?v=4",
			role: "Desarrollador Front-end",
		},
		
	];

	return (
        <div className={style.containerPadre}>
            <h1 className="text-3xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500 font-bold mb-5" >
                Conoce nuestro equipo de desarrolladores
            </h1>
            <div className={`${style.container} ${style.containerGrid}`}>
                {arrayGroup.map((integrante) => {
                    return (
                        <div
                            className={`${styles.container}${style.cardscale}`}
                            key={integrante.id}
                        >
                            <div className={style.memberInfo}>
                                <img
                                    className={styles.image}
                                    src={integrante.photo}
                                    alt={`${integrante.name} ${integrante.lastname}`}
                                />
                                <div className={style.memberDetails}>
                                    <h4 className="text-2xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500 font-bold mb-5" >
                                        {integrante.name} {integrante.lastname}
                                    </h4>
                                    <p className={styles.span}>
                                        {integrante.role}
                                    </p>
                                    <div className={style.socialLinks}>
    <div className={style.socialIcons}>
        {integrante.linkedin && (
            <a
                href={integrante.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className={style.linkIcon}
            >
                <BsLinkedin />
            </a>
        )}
        {integrante.github && (
            <a
                href={integrante.github}
                target='_blank'
                rel='noopener noreferrer'
                className={style.linkIcon}
            >
                <BsGithub />
            </a>
        )}
	
    </div>
	<br />
</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CardsGroup;