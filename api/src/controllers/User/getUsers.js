const { User } = require("../../db");

const getUsers = async (condition) => {
    const users = await User.findAll({
        where: condition,
    });
    return users;
};

module.exports = getUsers;