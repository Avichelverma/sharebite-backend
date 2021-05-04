const db = require('../config/db.config.js');
const Item = db.items;
const Modifier = db.modifiers;

exports.addModifierToItem = (req, res) => {
	const { item_id, modifier_id } = req.params;

	Item.findByPk(item_id)
		.then((item) => {
			if (!item) {
				throw 'Item Not found';
			}
			Modifier.findByPk(modifier_id)
				.then((modifier) => {
					if (!modifier) {
						throw 'Modifier not found';
					}
					item.addModifier(modifier);
					return res.status(200).json({
						success: true,
						message: `Added modifier_id:${modifier_id} to item_id:${item_id}`
					});
				})
				.catch((err) => {
					return res.status(404).json({
						success: false,
						error: err
					});
				});
		})
		.catch((err) => {
			return res.status(404).json({
				success: false,
				error: err
			});
		});
};
