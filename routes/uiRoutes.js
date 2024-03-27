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
        console.log('Rendering addMenuItem page'); // Add a log statement
        res.render('addMenuItem');
    });

    // Route to handle form submission for adding a new item to the menu
    router.post('/menu/add', async (req, res) => {
        try {
            const newItem = req.body; 
            await db.addMenuItem(newItem, pool);
            res.redirect('/menu'); 
        } catch (error) {
            console.error('Error adding menu item:', error);
            res.status(500).send('Internal server error');
        }
    });

    // Route to handle search form submission and render update form
    router.post('/menu/update', async (req, res) => {
        try {
            const itemId = req.body.itemId;
            console.log('Received search form submission for item ID:', itemId); 
            const menuItem = await db.getMenuItemById(itemId, pool); 
            console.log('Retrieved menu item:', menuItem); 
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

     // Route to render delete item search page
     router.get('/menu/delete', (req, res) => {
        res.render('deleteMenuItemSearch');
    });

    // Route to handle delete item search form submission and render delete confirmation
    router.post('/menu/delete', async (req, res) => {
        try {
            const itemId = req.body.itemId;
            const menuItem = await db.getMenuItemById(itemId, pool); 
            if (!menuItem) {
                res.status(404).send('Menu item not found');
                return;
            }
            res.render('deleteMenuItem', { menuItem });
        } catch (error) {
            console.error('Error searching for menu item:', error);
            res.status(500).send('Internal server error');
        }
    });

    // Route to handle delete confirmation and delete item
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

