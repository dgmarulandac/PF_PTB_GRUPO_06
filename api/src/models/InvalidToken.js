const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const InvalidToken = sequelize.define(
		"InvalidToken",
		{
			token: {
				type: DataTypes.STRING,
				trim: true,
			},
		}
	);

	return InvalidToken;
};