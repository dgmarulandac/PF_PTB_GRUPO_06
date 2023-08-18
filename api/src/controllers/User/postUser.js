const { User, Role } = require("../../db");
const bcrypt = require("bcryptjs");
const { buyerRole } = require("../../rolesSpec");

const postUser = async ( user ) => {
    
    if( ! await userVerificationDisplay(user.displayName) ) {
        throw Error(`El nombre de ususario ${user.displayName} no esta disponible.`);
    }
    if ( !emailVerification(user.email) ) {
        throw Error("Correo electronico invalido.")
    }
    if( ! await userVerificationEmail(user.email) ) {
        throw Error(`El correo ${user.email} ya esta en uso, por favor inicia sesion.`);
    }

    let {password} = user;
    password = bcrypt.hashSync(password, 8);
    user = {...user, password };

    const newUser = await User.create( user );

    const defaultRole = await Role.findOne({
        where: { type: buyerRole }
    });
    newUser.addRoles(defaultRole);

    // ACA CECI
    return {message: "El usuario se ha creado satisfactoriamente."};
};

const userVerificationDisplay = async ( displayName ) => {
    const usuario = await User.findOne( { where: {displayName: displayName} } );
    return usuario !== null ? false: true;
};

const userVerificationEmail = async ( email ) => {
    const usuario = await User.findOne( { where: {email: email} } );
    return usuario !== null ? false: true;
};

const emailVerification = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

module.exports = postUser;