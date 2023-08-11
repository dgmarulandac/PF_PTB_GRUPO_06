const { User, Role } = require("../../db");

const postUser = async ( user ) => {

    // TODO: Hash de contraseña
    // TODO: Validación inicial del usuario. (que no exista, que el correo sea un email, etc)

    const newUser = await User.create( user );

    const defaultRole = await Role.findAll({
        where: { type: "Comprador" }
    });
    newUser.addRoles(defaultRole[0]);

    return newUser;
};

module.exports = postUser;