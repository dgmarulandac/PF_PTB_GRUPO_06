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
  let pass = false;
  roles.forEach(role => {
    if( role.type === adminRole ) {
        next();
        pass = true;
    }
  });
  if( !pass ) {
    return res.status(403).json({error: "Se requiere el rol de Administrador para ver esto."})
  } else {
    return pass;
  }
};

const isSeller = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  let pass = false;
  roles.forEach(role => {
    if( role.type === sellerRole ) {
        next();
        pass = true;
    }
  });
  if( !pass ) {
    return res.status(403).json({error: "Se requiere el rol de Vendedor para ver esto."})
  } else {
    return pass;
  }
};

const isBuyer = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  let pass = false;
  roles.forEach(role => {
    if( role.type === buyerRole ) {
        next();
        pass = true;
    }
  });
  if( !pass ) {
    return res.status(403).json({error: "Se requiere el rol de Comprador para ver esto."})
  } else {
    return pass;
  }
};

module.exports = { verifyToken, isAdmin, isBuyer, isSeller };