const { User, Role } = require("../../db");

const getUsers = async () => {
    const users = await User.findAll({
        include: Role
    });
    return users;
};

module.exports = getUsers;