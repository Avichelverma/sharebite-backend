const db = require('../config/db.config.js');
const Item = db.items;

exports.createItem = (req, res) => {
	if (Object.keys(req.body).length === 0) {
		throw 'Request Body Empty';
	}
	const { name, description, price } = req.body;
	const { section_id } = req.params;
	Item.create({
		name: name,
		description: description,
		price: price,
		sectionId: section_id
	})
		.then(() => {
			return res.status(200).json({
				success: true,
				message: 'Item added successfully'
			});
		})
		.catch((err) => {
			return res.status(500).json({
				error: err,
				success: false
			});
		});
};

exports.getAllItems = (req, res) => {
	Item.findAll({ include: [ 'modifiers' ] }).then((items) => {
		return res.status(200).json({
			items,
			total_items: items.length
		});
	});
};

exports.getItemById = (req, res) => {
	const { item_id } = req.params;
	Item.findByPk(item_id, { include: [ 'modifiers' ] })
		.then((item) => {
			return res.status(200).json({
				success: true,
				item
			});
		})
		.catch((err) => {
			return res.status(404).json({
				success: false,
				error: 'Item Not Found'
			});
		});
};

exports.updateItemById = (req, res) => {
	const { item_id } = req.params;
	Item.update(req.body, { where: { id: item_id } })
		.then((num) => {
			if (num == 1) {
				return res.status(200).json({
					success: true,
					message: 'Item was updated successfully'
				});
			} else {
				return res.status(404).json({ success: false, message: 'Item not found to be updated' });
			}
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				error: err
			});
		});
};

exports.deleteItemById = (req, res) => {
	const { item_id } = req.params;

	Item.destroy({ where: { id: item_id } })
		.then((num) => {
			if (num == 1) {
				return res.status(200).json({
					success: true,
					message: 'Item was deleted successfully'
				});
			} else {
				return res.status(404).json({ success: false, message: 'Item not found to be deleted' });
			}
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				error: err
			});
		});
};
