const db = require('../config/db.config.js');
const Section = db.sections;
const Item = db.items;
const Modifier = db.modifiers;

exports.getMenu = (req, res) => {
	Section.findAll({
		as: 'section',
		attributes: [ 'id', 'name' ],
		include: [
			{
				model: Item,
				as: 'items',
				where: { sectionId: db.Sequelize.col('section.id') },
				attributes: [ 'id', 'name', 'price', 'description' ],
				include: [
					{
						model: Modifier,
						as: 'modifiers',
						where: { itemId: db.Sequelize.col('items.id') },
						attributes: [ 'id', 'title' ],
						through: { attributes: [] }
					}
				]
			}
		]
	}).then((sections) => {
		return res.status(200).json({
			sections,
			total_sections: sections.length
		});
	});
};
