const { User } = require("../../db");

const getUserById = async (id) => {
    const user = await User.findByPk(id,{
        include: {model: Role, attributes: ['type'], through: {
            attributes: []
        }}});
    return user;
};

module.exports = getUserById;