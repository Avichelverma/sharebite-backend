const express = require('express');
const router = express.Router();

const { createSection, getAllSections, getSectionById, updateSectionById, deleteSectionById } = require('../controllers/section');
const { createItem, getAllItems, getItemById, updateItemById, deleteItemById } = require('../controllers/item');
const { createModifier, getAllModifier, getModifierById, updateModifierById, deleteModifierById } = require('../controllers/modifier');
const { addModifierToItem } = require('../controllers/itemModifier');
const { getMenu } = require('../controllers/menu');

// ------ Routes to Section Controller----------------
router.get('/sections', getAllSections);
router.post('/sections', createSection);
router.get('/sections/:section_id', getSectionById);
router.put('/sections/:section_id', updateSectionById);
router.delete('/sections/:section_id', deleteSectionById);

// ------ Routes to Item Controller----------------
router.get('/items', getAllItems);
router.get('/items/:item_id', getItemById);
router.post('/sections/:section_id/items', createItem);
router.put('/items/:item_id', updateItemById);
router.delete('/items/:item_id', deleteItemById);

// ------ Routes to Modifier Controller----------------
router.get('/modifiers', getAllModifier);
router.get('/modifiers/:modifier_id', getModifierById);
router.post('/modifiers', createModifier);
router.put('/modifiers/:modifier_id', updateModifierById);
router.delete('/modifiers/:modifier_id', deleteModifierById);

// ------ Routes to ItemModifier Controller----------------
router.post('/items/:item_id/modifiers/:modifier_id', addModifierToItem);

// ------ Routes to Menu Controller----------------
router.get('/menu', getMenu);

module.exports = router;
