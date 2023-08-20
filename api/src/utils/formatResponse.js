const formatResponse = (status, type, message = null, error = null) => {
	return { status, type, message, error };
};

module.exports = { formatResponse };