const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
	host: env.host,
	dialect: env.dialect,
	operatorsAliases: false,
	define: {
		timestamps: false
	},

	pool: {
		max: env.max,
		min: env.pool.min,
		acquire: env.pool.acquire,
		idle: env.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sections = require('../model/section')(sequelize, Sequelize);
db.items = require('../model/item')(sequelize, Sequelize);
db.modifiers = require('../model/modifier')(sequelize, Sequelize);

// Here we can connect section and item based on section_id
db.sections.hasMany(db.items, { as: 'items', onDelete: 'cascade' });
db.items.belongsTo(db.sections, { foreignKey: 'sectionId', as: 'section' });

//Here we connect items with modifiers in a N:M relationship
db.items.belongsToMany(db.modifiers, { through: 'item_modifier', as: 'modifiers', foreignKey: 'itemId', onDelete: 'cascade' });
db.modifiers.belongsToMany(db.items, { through: 'item_modifier', as: 'items', foreignKey: 'modifierId', onDelete: 'cascade' });

module.exports = db;
