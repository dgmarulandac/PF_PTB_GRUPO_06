const { User } = require("../../../db");
const {SECRET} = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bohoLogin = async (user) => {
    if( !user.displayName && !user.password ) {
        throw Error("Datos de usuario incorrectos.")
    }

    const candidateUser = await User.findOne({where: { displayName: user.displayName }});

    if( candidateUser === null ) {
        throw Error('El usuario no existe, registrate antes de iniciar sesión.');
    }

    const validation = bcrypt.compareSync( user.password, candidateUser.password );

    if( !validation ) {
        throw Error('Contraseña Incorrecta.');
    }

    const token = jwt.sign({id: candidateUser.id}, SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: false,
        expiresIn: 604800, // 7 days
    });

    let roles = await candidateUser.getRoles();
    roles = roles.map( role => role.type );

    return {
        id: candidateUser.id,
        displayName: candidateUser.displayName,
        email: candidateUser.email,
        name: candidateUser.name,
        image: candidateUser.image,
        address: candidateUser.address,
        nationality: candidateUser.nationality,
        phone: candidateUser.phone,
        roles: roles,
        jwt: token
    };
};

module.exports = bohoLogin;