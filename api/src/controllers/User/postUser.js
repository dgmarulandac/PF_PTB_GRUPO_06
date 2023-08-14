const { User, Role } = require("../../db");
const { buyerRole } = require("../../rolesSpec");

const postUser = async ( user ) => {

    // TODO: Hash de contraseña
    if( ! await userVerificationDisplay(user.displayName) ) {
        throw Error(`The displayName ${user.displayName} is not available.`);
    }
    if ( !emailVerification(user.email) ) {
        throw Error("Email Invalid")
    }
    if( ! await userVerificationEmail(user.email) ) {
        throw Error(`The email ${user.email} is already in use, please log in.`);
    }

    const newUser = await User.create( user );

    const defaultRole = await Role.findOne({
        where: { type: buyerRole }
    });
    newUser.addRoles(defaultRole);

    return newUser;
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