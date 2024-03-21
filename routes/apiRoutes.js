const express = require('express');
const router = express.Router();
const db = require('../dal/db');

// Get menu items (GET)
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await db.getAllMenuItems();
        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add menu items (POST)
router.post('/menu', async (req, res) => {
    try {
        const newItem = req.body; 
        const addItem = await db.addMenuItem(newItem);
        res.status(201).json(addedItem);
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update menu items (PUT)
router.put('/menu/', async (req, res) => {
    const itemId = req.params.id;
    try {
        const updatedItem = req.body;
        const result = await db.updateMenuItem(itemId, updatedItem);
        res.json(result);
    } catch (error) {
        console.error(`Error updating menu item with ID ${itemId}:`, error);
        res.status(500).json({ error: 'Internal server error '});
    }
});

// Update specific field of menu item (PATCH)
router.patch('/menu/', async (req, res) => {
    const itemId = req.params.id;
    try {
        const upddatedFields = req.body;
        const updatedItem = await db.updateMenuItemFields(itemId, updatedFields);
        res.json(updatedItem);
    } catch (error) {
        console.error(`Error updating menu item with ID ${itemId}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete menu items (DELETE)
router.delete('/menu/', async (req, res) => {
    const itemId = req.params.id;
    try {
        const deletedItem = await db.deleteMenuItem(itemId);
        res.json(deletedItem);
    } catch (error) {
        console.error(`Error deleting menu item with ID ${itemId}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;