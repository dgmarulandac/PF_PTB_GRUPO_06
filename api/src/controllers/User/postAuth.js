const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const {SECRET} = process.env;

const postAuth = async (token) => {
    // verify jwt

    let userId = "";

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            throw Error ("No Autorizado.");
        }
        userId = decoded.id;
    });

    //send user info

    const candidateUser = await User.findByPk(userId);

    if( !candidateUser ) {
        throw Error ("Usuario Invalido");
    }

    let roles = await candidateUser.getRoles();
    roles = roles.map( role => role.type );

    return {
        id: candidateUser.id,
        displayName: candidateUser.displayName,
        email: candidateUser.email,
        name: candidateUser.name,
        image: candidateUser.image,
        roles: roles,
        jwt: token
    };
};

module.exports = postAuth;