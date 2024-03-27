const express = require('express');
const router = express.Router();
const db = require('../dal/db');

module.exports = (pool) => {
    // Route to render menu page
    router.get('/menu', async (req, res) => {
        try {
            const menuItems = await db.getAllMenuItems(pool); 
            res.render('menu', { menuItems });
        } catch (error) {
            console.error('Error loading menu page:', error);
            res.status(500).send('Internal server error');
        }
    });

    // Route to render add new item page
    router.get('/menu/add', (req, res) => {
        res.render('addMenuItem');
    });

    // Route to render search and update item page
    router.get('/menu/update', async (req, res) => {
        res.render('updateMenuItemSearch');
    });

    // Route to handle search form submission and render update form
router.post('/menu/update', async (req, res) => {
    try {
        const itemId = req.body.itemId;
        console.log('search form submitted', itemId);
        const menuItem = await db.getMenuItemById(itemId, pool); 
        if (!menuItem) {
            res.status(404).send('Menu item not found');
            return;
        }
        res.render('updateMenuItem', { menuItem }); 
    } catch (error) {
        console.error('Error searching for menu item:', error);
        res.status(500).send('Internal server error');
    }
});


    // Route to handle update form submission
    router.post('/menu/update/:id', async (req, res) => {
        try {
            const itemId = req.params.id;
            const updatedItemData = req.body;
            await db.updateMenuItem(itemId, updatedItemData, pool); 
            res.redirect('/menu');
        } catch (error) {
            console.error('Error updating menu item:', error);
            res.status(500).send('Internal server error');
        }
    });

    // Route to render delete item page
    router.get('/menu/delete/:id', async (req, res) => {
        try {
            const itemId = req.params.id;
            const menuItem = await db.getMenuItemById(itemId, pool); 
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


    // Route to handle delete item form submission
    router.post('/menu/delete/:id', async (req, res) => {
        try {
            const itemId = req.params.id;
            await db.deleteMenuItem(itemId, pool); 
            res.redirect('/menu');
        } catch (error) {
            console.error('Error deleting menu item:', error);
            res.status(500).send('Internal server error');
        }
    });

    return router;
};


