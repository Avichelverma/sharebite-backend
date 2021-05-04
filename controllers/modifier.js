const db = require('../config/db.config.js');
const Modifier = db.modifiers;

exports.createModifier = (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw 'Request Body Empty';
	}
	const { title } = req.body;
	Modifier.create({
		title: title
	})
		.then(() => {
			return res.status(200).json({
				success: true,
				message: 'Modifier added successfully'
			});
		})
		.catch((err) => {
			return res.status(500).json({
				error: err,
				success: false
			});
		});
};

exports.getAllModifier = (req, res) => {
	Modifier.findAll({ include: [ 'items' ] }).then((modifiers) => {
		return res.status(200).json({
			modifiers,
			total_modifiers: modifiers.length
		});
	});
};

exports.getModifierById = (req, res) => {
	const { modifier_id } = req.params;
	Modifier.findByPk(modifier_id, { include: [ 'items' ] })
		.then((modifier) => {
			return res.status(200).json({
				success: true,
				modifier
			});
		})
		.catch((err) => {
			return res.status(404).json({
				success: false,
				error: 'Modifier Not Found'
			});
		});
};

exports.updateModifierById = (req, res) => {
	const { modifier_id } = req.params;
	Modifier.update(req.body, { where: { id: modifier_id } })
		.then((num) => {
			if (num == 1) {
				return res.status(200).json({
					success: true,
					message: 'Modifier was updated successfully'
				});
			} else {
				return res.status(404).json({ success: false, message: 'Modifier not found to be updated' });
			}
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				error: err
			});
		});
};

exports.deleteModifierById = (req, res) => {
	const { modifier_id } = req.params;
	Modifier.destroy({ where: { id: modifier_id } })
		.then((num) => {
			if (num == 1) {
				return res.status(200).json({
					success: true,
					message: 'Modifier was deleted successfully'
				});
			} else {
				return res.status(404).json({ success: false, message: 'Modifier not found to be deleted' });
			}
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				error: err
			});
		});
};
