const { User } = require("../../db");

const toggleUser = async (id) => {
    const user = await User.findByPk(id);
    
    user.active = !user.active;
    user.save();
    
    return user;
};

module.exports = toggleUser;