module.exports = (sequelize, Sequelize) => {
	const Section = sequelize.define('section', {
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		}
	});

	return Section;
};
