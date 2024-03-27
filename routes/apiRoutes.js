const express = require('express');
const router = express.Router();
const { pool } = require('../dal/db');

module.exports = (pool) => {
    // Get menu items (GET)
    router.get('/menu', async (req, res) => {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM menu_items');
            client.release();
            res.json(result.rows);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Add menu item (POST)
    router.post('/menu/add', async (req, res) => {
        try {
            const newItem = req.body;
            const client = await pool.connect();
            const result = await client.query('INSERT INTO menu_items(name, description, price, availability) VALUES($1, $2, $3, $4) RETURNING *', [newItem.name, newItem.description, newItem.price, newItem.availability]);
            client.release();
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error adding menu item:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Update menu item (PUT)
    router.put('/menu/:id', async (req, res) => {
        const itemId = req.params.id;
        try {
            const updatedItem = req.body;
            const client = await pool.connect();
            const result = await client.query('UPDATE menu_items SET name = $1, description = $2, price = $3, availability = $4 WHERE id = $5 RETURNING *', [updatedItem.name, updatedItem.description, updatedItem.price, updatedItem.availability, itemId]);
            client.release();
            if (result.rows.length === 0) {
                throw new Error(`Menu item with ID ${itemId} not found`);
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(`Error updating menu item with ID ${itemId}:`, error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Delete menu item (DELETE)
    router.delete('/menu/:id', async (req, res) => {
        const itemId = req.params.id;
        try {
            const client = await pool.connect();
            const result = await client.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [itemId]);
            client.release();
            if (result.rows.length === 0) {
                throw new Error(`Menu item with ID ${itemId} not found`);
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error(`Error deleting menu item with ID ${itemId}:`, error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
};



