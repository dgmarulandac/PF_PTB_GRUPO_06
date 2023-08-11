const { User } = require("../../db");

const getUserCheck = async (displayName, email) => {
    const users = await User.findAll({
        where: {displayName: displayName, email: email},
        attributes: ['id']
    });
    return users.length ? true : false;
};

module.exports = getUserCheck;