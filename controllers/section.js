const { sections } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Section = db.sections;

exports.createSection = (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw 'Request body empty';
	}
	const { name, description } = req.body;
	Section.create({
		name: name,
		description: description
	})
		.then(() => {
			return res.status(200).json({
				success: true,
				message: 'Section added successfully'
			});
		})
		.catch((err) => {
			return res.status(500).json({
				error: err,
				success: false
			});
		});
};

exports.getAllSections = (req, res) => {
	Section.findAll({
		include: [ 'items' ]
	}).then((sections) => {
		return res.status(200).json({
			success: true,
			sections,
			total_sections: sections.length
		});
	});
};

exports.getSectionById = (req, res) => {
	const { section_id } = req.params;
	Section.findByPk(section_id, { include: [ 'items' ] })
		.then((sections) => {
			return res.status(200).json({
				success: true,
				sections
			});
		})
		.catch((err) => {
			return res.status(404).json({
				success: false,
				error: 'Section Not Found'
			});
		});
};

exports.updateSectionById = (req, res) => {
	const { section_id } = req.params;

	Section.update(req.body, { where: { id: section_id } })
		.then((num) => {
			if (num == 1) {
				return res.status(200).json({
					success: true,
					message: 'Section was updated successfully'
				});
			} else {
				return res.status(404).json({ success: false, message: 'Section not found to be updated' });
			}
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				error: err
			});
		});
};

exports.deleteSectionById = (req, res) => {
	const { section_id } = req.params;

	Section.destroy({ where: { id: section_id }, cascade: true })
		.then((num) => {
			if (num == 1) {
				return res.status(200).json({
					success: true,
					message: 'Section was updated deleted'
				});
			} else {
				return res.status(404).json({ success: false, message: 'Section not found to be deleted' });
			}
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				error: err
			});
		});
};
