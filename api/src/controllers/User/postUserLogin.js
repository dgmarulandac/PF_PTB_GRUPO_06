const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const bcrypt = require("bcryptjs");

const postUserLogin = async ( user ) => {
    const candidateUser = await User.findOne({where: { displayName: user.displayName }});

    if( candidateUser === null ) {
        throw Error('The user does not exist, please sign up.');
    }

    const validation = bcrypt.compareSync( user.password, candidateUser.password );

    if( !validation ) {
        throw Error('Invalid Password.');
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
        roles: roles,
        accessToken: token
    };
};

module.exports = postUserLogin;