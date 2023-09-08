const { User } = require('../../db');

const putUpdateUser = async (id, user) => {
    const existUser = await User.findByPk(id);
    
    if (!existUser) {
        throw Error('El usuario no existe.');
    }

    const { name, phone, nationality, address, image } = user;
    const updatedUser = await existUser.update({ name, phone, nationality, address, image });
    delete updatedUser.dataValues.password;
    return updatedUser;
};

module.exports = putUpdateUser;