const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const postUser = require("./postUser");

const bohoLogin = require("./Login/bohoLogin");
const googleLogin = require("./Login/googleLogin");

const postUserLogin = async ( user ) => {

    if( user.platform === "boho" ) {
        
        return bohoLogin(user);

    } else if( user.platform === 'google' ) {
        
        const decodedUser = jwt.decode(user.jwt);

        console.log(decodedUser);
        
        const candidateUser = await User.findOne({where: { email: decodedUser.email }});

        if( !candidateUser ) {
            const password = crypto.randomBytes(25).toString('hex');
            const userCreate = { password, email: decodedUser.email, name: decodedUser.name, displayName: decodedUser.email, image: decodedUser.picture };
            postUser(userCreate);
        }

        return googleLogin(decodedUser.email);

    } else {
        throw Error('Plataforma indefinida, error al iniciar sesión.')
    }

};

module.exports = postUserLogin;