const { User } = require("../../db");

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    return user;
};

module.exports = getUserById;