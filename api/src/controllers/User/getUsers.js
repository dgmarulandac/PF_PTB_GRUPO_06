const { User } = require("../../db");

const getUsers = async () => {
    const users = await User.findAll();
    return users;
};

module.exports = getUsers;