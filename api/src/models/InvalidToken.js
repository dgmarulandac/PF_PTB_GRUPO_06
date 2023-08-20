const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const InvalidToken = sequelize.define(
		"InvalidToken",
		{
			token: {
				type: DataTypes.STRING,
				trim: true,
			},
			expiresAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				expires: 3600, //1hs
			},
		},
		{
			timestamps: false,
		}
	);

	return InvalidToken;
};