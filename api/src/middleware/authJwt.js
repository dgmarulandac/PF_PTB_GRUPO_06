const jwt = require("jsonwebtoken");
const {SECRET} = process.env;
const {User} = require("../db");
const {buyerRole, sellerRole, adminRole} = require("../rolesSpec");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if( !token ) {
        return res.status(403).json({error: "No token provided."});
    }

    jwt.verify(token, SECRET,(err, decoded) => {
              if (err) {
                return res.status(401).json({error: "Unauthorized."});
              }
              req.id = decoded.id;
              next();
            });
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  roles.array.forEach(role => {
    if( role.type === adminRole ) {
        next();
        return;
    }
  });
  res.status(403).json({error: "Admin role is required."})
};

const isSeller = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  roles.array.forEach(role => {
    if( role.type === sellerRole ) {
        next();
        return;
    }
  });
  res.status(403).json({error: "Seller role is required."})
};

const isBuyer = async (req, res, next) => {
  const user = await User.findByPk(req.id);
  const roles = await user.getRoles();
  roles.array.forEach(role => {
    if( role.type === buyerRole ) {
        next();
        return;
    }
  });
  res.status(403).json({error: "Buyer role is required."})
};

module.exports = { verifyToken, isAdmin, isBuyer, isSeller };