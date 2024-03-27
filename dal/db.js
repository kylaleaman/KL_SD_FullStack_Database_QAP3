const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'JavaBelle',
    password: 'HarleeBuddy0211',
    port: 5432,
});

async function getAllMenuItems() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM menu_items');
        return result.rows;
    } finally {
        client.release();
    }
}

async function addMenuItem(newItem) {
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO menu_items(name, description, price, availability) VALUES($1, $2, $3, $4) RETURNING *', [newItem.name, newItem.description, newItem.price, newItem.availability]);
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function updateMenuItem(itemId, updatedItem) {
    const client = await pool.connect();
    try {
        const result = await client.query('UPDATE menu_items SET name = $1, description = $2, price = $3, availability = $4 WHERE id = $5 RETURNING *',
        [updatedItem.name, updatedItem.description, updatedItem.price, updatedItem.availability, itemId]); // Corrected itemID to itemId
        if (result.rows.length === 0) {
            throw new Error(`Menu item with ID ${itemId} not found`);
        }
        return result.rows[0];
    } finally {
        client.release();
    }
}

async function deleteMenuItem(itemId) {
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [itemId]);
        if (result.rows.length === 0) {
            throw new Error(`Menu with item ID ${itemId} not found`);
        }
        return result.rows[0];
    } finally {
        client.release();
    }
};
    async function getMenuItemById(itemId) {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM menu_items WHERE id = $1', [itemId]);
            return result.rows[0];
        } finally {
            client.release();
        }
    
};

async function getMenuItemById(itemId) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM menu_items WHERE id = $1', [itemId]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    } finally {
        client.release();
    }
}

module.exports = {
    getAllMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuItemById,
    pool
};
