const { User, Role } = require("../../db");

const getUsers = async () => {
    const users = await User.findAll({
        include: {model: Role, attributes: ['type'], through: {
            attributes: []
        }}
    });
    return users;
};

module.exports = getUsers;