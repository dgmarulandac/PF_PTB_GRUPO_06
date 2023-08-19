const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const {User} = require("../db");
const {buyerRole, sellerRole, adminRole} = require("../rolesSpec");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if( !token ) {
        return res.status(403).json({error: "No se ha enviado un token."});
    }

    jwt.verify(token, SECRET, (err, decoded) => {
              if (err) {
                return res.status(401).json({error: "No Autorizado."});
              }
              req.id = decoded.id;
              next();
            });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  roles.forEach(role => {
    if( role.type === adminRole ) {
        next();
        return;
    }
  });
  res.status(403).json({error: "Se requiere el rol de admin para ver esto."})
};

const isSeller = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  roles.forEach(role => {
    if( role.type === sellerRole ) {
        next();
        return;
    }
  });
  res.status(403).json({error: "Se requiere el rol de vendedor para ver esto."})
};

const isBuyer = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  roles.forEach(role => {
    if( role.type === buyerRole ) {
        next();
        return;
    }
  });
  res.status(403).json({error: "Se requiere el rol de comprador para ver esto."})
};

module.exports = { verifyToken, isAdmin, isBuyer, isSeller };