const jwt = require("jsonwebtoken");
const {GOOGLE_SECRET} = process.env;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

const verifyGoogle = (req, res, next) => {

    async function verify(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_SECRET,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    };


    if( req.body.platform === "google" ) {
        verify(req.body.jwt)
        .then((data)=>{
            next();
        }).catch( (reason) => {
            return res.status(401).json({error: "No Autorizado."});
        });
    } else {
        next();
    }
};

module.exports = { verifyGoogle }