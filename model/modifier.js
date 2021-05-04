module.exports = (sequelize, Sequelize) => {
	const Modifier = sequelize.define('modifier', {
		title: {
			type: Sequelize.STRING
		}
	});

	return Modifier;
};
