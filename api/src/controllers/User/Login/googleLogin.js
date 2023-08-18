const { User } = require("../../../db");
const jwt = require("jsonwebtoken");

const googleLogin = async (email) => {

    const candidateUser = await User.findOne({where: { email: email }});

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
        roles: roles,
        jwt: token
    };
};

module.exports = googleLogin;