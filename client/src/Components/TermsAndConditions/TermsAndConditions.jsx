import React from "react";
import styles from "./TermsAndConditions.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as Terstyles from "./Terstyles";

export default function TermsAndConditions() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleAcceptance = () => {
    if (accepted) {
      navigate("/register");
    } else {
      Swal.fire({
        title: "Aceptar términos y condiciones",
        text: "Debes aceptar los términos y condiciones antes de continuar.",
        icon: "error",
      });
    }
  };

  const handleCheckboxChange = (event) => {
    setAccepted(event.target.checked);
  };

  return (
    <>
      <div className={Terstyles.container}>
        <div className="{}">
          <h1 className={Terstyles.h1}>
            Términos y Condiciones <span className={Terstyles.span}>BOHO</span>
          </h1>
          <hr className={styles.rotatingBar} />
          <ol>
            <li>
              <h2 className={Terstyles.h2}>Aceptación de los términos</h2>
              <p className={Terstyles.p}>
                Al utilizar <span className={Terstyles.span}>BOHO</span> para
                comprar boletos para eventos, aceptas los siguientes términos y
                condiciones en su totalidad. Si no estás de acuerdo con alguno
                de estos términos, te pedimos que no utilices el sitio.
              </p>
            </li>
            <li>
              <h2 className={Terstyles.h2}>Propósito de la página</h2>
              <p className={Terstyles.p}>
                BOHO es una plataforma de venta de boletos para eventos tales
                como conciertos, exposiciones, teatro, etc. No garantizamos la
                disponibilidad de boletos para todos los eventos ni la calidad
                de los eventos listados.
              </p>
            </li>
            <li>
              <h2 className={Terstyles.h2}>Responsabilidad de los usuarios</h2>
              <p className={Terstyles.p}>
                Tú eres responsable de la información que proporcionas en{" "}
                <span className={Terstyles.span}>BOHO</span>. Debes asegurarte
                de que tus datos personales y de pago sean precisos y verídicos.
                No nos hacemos responsables de las consecuencias derivadas de
                información falsa o engañosa.
              </p>
            </li>
            <li>
              <h2 className={Terstyles.h2}>Cancelación y reembolso</h2>
              <p className={Terstyles.p}>
                Los términos de cancelación y reembolso están sujetos a la
                política del organizador del evento. Por favor, revisa los
                detalles específicos para cada evento antes de realizar la
                compra.
              </p>
            </li>
            <li>
              <h2 className={Terstyles.h2}>Privacidad y protección de datos</h2>
              <p className={Terstyles.p}>
                Nos comprometemos a proteger tu privacidad y tus datos
                personales de acuerdo con nuestra Política de Privacidad. Sin
                embargo, no podemos garantizar la seguridad completa de la
                información transmitida a través de Internet.
              </p>
            </li>
            <li>
              <h2 className={Terstyles.h2}>Propiedad intelectual</h2>
              <p className={Terstyles.p}>
                Todos los derechos de propiedad intelectual relacionados con{" "}
                <span className={Terstyles.span}>BOHO</span>, incluyendo el
                diseño, logotipos, contenido y software, son propiedad exclusiva
                de sus respectivos dueños. No se permite la reproducción,
                distribución o modificación sin autorización previa.
              </p>
            </li>
            <li>
              <h2 className={Terstyles.h2}>Limitación de responsabilidad</h2>
              <p className={Terstyles.p}>
                BOHO no será responsable de ningún daño directo, indirecto,
                incidental, especial o consecuente que surja del uso o la
                incapacidad de uso del sitio. Asimismo, no nos responsabilizamos
                por cualquier interrupción en el servicio, falla técnica o virus
                informático que pueda afectar el uso del portal.
              </p>
            </li>
            <li>
              <h2 className={Terstyles.h2}>Modificaciones y término</h2>
              <p className={Terstyles.p}>
                Nos reservamos el derecho de modificar estos términos y
                condiciones en cualquier momento.
              </p>
              <p className={Terstyles.p}>
                Te recomendamos revisar regularmente esta sección. Asimismo, nos
                reservamos el derecho de suspender o terminar el servicio de{" "}
                <span className={Terstyles.span}>BOHO</span> en cualquier
                momento, sin previo aviso.
              </p>
            </li>
          </ol>
          <hr className={styles.rotatingBar} />
          <p className={Terstyles.p}>
            Al utilizar <span className={Terstyles.span}>BOHO</span>, aceptas cumplir con estos términos y condiciones.
          </p>
          <p className={Terstyles.p}>
            Si no estás de acuerdo, te pedimos que no utilices el sitio. Para
            cualquier duda o consulta, puedes contactarnos a través de nuestros
            canales de atención al cliente.
          </p>
          <div className={styles.acceptWrapper}>
            <input
              type="checkbox"
              id="acceptCheckbox"
              className={Terstyles.check}
              checked={accepted}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="acceptCheckbox" className={Terstyles.label}>
              Acepto los términos y condiciones
            </label>
          </div>
          <button className={Terstyles.Button} onClick={handleAcceptance}>
          <span class="relative z-10">Aceptar</span>
          </button>
        </div>
      </div>
    </>
  );
}
