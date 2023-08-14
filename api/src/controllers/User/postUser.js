const { User, Role } = require("../../db");
const { buyerRole } = require("../../rolesSpec");

const postUser = async ( user ) => {

    // TODO: Hash de contraseña
    // TODO: Validación inicial del usuario. (que no exista, que el correo sea un email, etc)

    const newUser = await User.create( user );

    const defaultRole = await Role.findOne({
        where: { type: buyerRole }
    });
    newUser.addRoles(defaultRole);

    return newUser;
};

module.exports = postUser;