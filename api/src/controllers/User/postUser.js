const { User, Role } = require("../../db");

const postUser = async ( user ) => {

    // TODO: Hash de contraseña
    // TODO: Validación inicial del usuario. (que no exista, que el correo sea un email, etc)

    const newUser = await User.create( user );

    // TODO: Agregar el ROL comprador
    return newUser;
};

module.exports = postUser;