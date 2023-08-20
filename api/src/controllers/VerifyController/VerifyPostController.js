const { User } = require("../../db");

const VerifyPostController = async (displayName) => {
	try {
		// Verifica si el email está presente
		if (!displayName) {
			throw new Error("Se requieren los datos");
		}

		// Busca el usuario en la base de datos
		const user = await User.findOne({
			where: {
				displayName: displayName,
			},
		});

		// Si no se encuentra al usuario, lanza un error
		if (!user) {
			throw new Error("Usuario no encontrado");
		}

		// Si el usuario existe, devolver un objeto con la propiedad 'success' establecida en true
		return {
			success: true,
			message: "Usuario verificado exitosamente",
		};
	} catch (error) {
		// Devolver un objeto con la propiedad 'success' establecida en false y una propiedad 'message' con el mensaje del error
		return { success: false, message: error.message };
	}
};

module.exports = { VerifyPostController };