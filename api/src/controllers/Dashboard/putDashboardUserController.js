const { User } = require('../../db');


const putDashboardUser = async (id, user) => {

    try {

        const existUser = await User.findByPk(id);

        if (!existUser) {
            throw Error('El usuario no existe.')
        }

        const { name, phone, nationality, identification, address, image } = user;
        const updatedUser = await existUser.update({ name, phone, nationality, identification, address, image });
        return updatedUser;

    } catch (error) {
        throw error.message;
    }



};

module.exports = putDashboardUser;