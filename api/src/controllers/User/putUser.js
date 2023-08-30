const { User, Role } = require("../../db");
const { Op } = require("sequelize");


const putUser = async ( id, user ) => {
    
    const existingUser = await User.findByPk(id);

    if( !existingUser ) {
        throw Error('El usuario no existe.')
    }
    if( ! await userVerificationDisplay(id, user.displayName) ) {
        throw Error(`El nombre de usuario ${user.displayName} no esta disponible.`);
    }
    if ( !emailVerification(user.email) ) {
        throw Error("Correo electronico invalido.")
    }
    if( ! await userVerificationEmail(id, user.email) ) {
        throw Error(`El correo ${user.email} ya esta en uso.`);
    }

    const {displayName, name, phone, email, nationality, address, roles} = user;

    const updatedUser = await existingUser.update({displayName, name, phone, email, nationality, address});

    const newRoles = await Role.findAll({
        where: { type: { [Op.in]: roles } }
    });
    updatedUser.addRoles(newRoles);
    
    return updatedUser;
};

const userVerificationDisplay = async ( existingId, displayName ) => {
    const usuario = await User.findOne( { where: {
        displayName: displayName,
        id: {[Op.ne]: existingId}
    }});
    return usuario !== null ? false: true;
};

const userVerificationEmail = async ( existingId, email ) => {
    const usuario = await User.findOne( { where: {
        email: email,
        id: {[Op.ne]: existingId}
    }});
    return usuario !== null ? false: true;
};

const emailVerification = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

module.exports = putUser;