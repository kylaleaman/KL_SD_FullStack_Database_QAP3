const express = require('express');
const router = express.Router();
const db = require('../dal/db');

// Route to render menu page
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await db.getAllMenuItems();
        res.render('menu', { menuItems });
    } catch (error) {
        console.error('Error loading menu page:', error);
        res.status(500).send('Internal server error');
    }
})

// Route to render add new item page
router.get('/menu/add', (req, res) => {
    res.render('addMenuItem');
});

// Route to render update item page 
router.get('/menu/update/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const menuItem = await db.getMenuItemById(itemId);
        if (!menuItem) {
            res.status(404).send('Menu item not found');
            return;
        }
        res.render('updateMenuItem', { menuItem });
    } catch (error) {
        console.error('Error updating page:', error);
        res.status(500).send('Internal server error');
    }
});

// Route to render delete item page
router.get('/menu/delete/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const menuItem = await db.getMenuItemByID(itemId);
        if (!menuItem) {
            res.status(404).send('Menu item not found');
            return;
        }
        res.render('deleteMenuItem', { menuItem });
    } catch (error) {
        console.error('Error rendering delete item page:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;

