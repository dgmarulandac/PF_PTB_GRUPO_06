import React, { useState } from 'react';

const EditEvent = ({ eventId, event }) => {
  const parsedEventId = parseInt(eventId);

  const evento = event; // Use event directamente

  const [nombre, setNombre] = useState(evento ? evento.name : '');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para actualizar los detalles del evento en la lista de eventos
    // Puedes usar el estado global, una API, o cualquier otra forma de manejar los datos
    console.log('Detalles del evento actualizados:', { id: parsedEventId, nombre });
  };

  if (!evento) {
    return <div>Evento no encontrado.</div>;
  }

  return (
    <div>
      <h2>Editar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={handleNombreChange} />
        </div>
        {/* ... otros campos de formulario */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditEvent;


