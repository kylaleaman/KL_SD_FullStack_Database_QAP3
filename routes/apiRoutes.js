const express = require('express');
const router = express.Router();

// Mock data for testing (typically use database queries)
let menuItems = [
    {id: 1, name: "Sugar Cookie Oat Latte", description: "Christmas in a cup - espresso, oat milk and sugar cookie syrup", price: 4.50, availability: true},
    {id: 2, name: "Cookies n Cream Cakepop", description: "Chocolate cake dipped in cookies n cream chocolate", price: 1.50, availability: true},
    {id: 3, name: "Green Tea Lemonage", description: "Green tea lemonade with your choice of flavour", price: 3.50, availability: false},
    {id: 4, name: "Pink Drink", description: "Strawberry Quencher made with Coconut Milk", price: 2.50, availability: false}
];

// Fetch all menu items
router.get('/menu', (req, res) => {
    res.json(menuItems);
});

// Route to add new menu item
router.post('/menu', (req, res) => {
    const newItem = req.body;
    newItem.id = menu_items.length + 1;
    menuItems.push(newItem);
    res.status(201).json({ message: 'Menu item added successfully', newItem });
});

// Route to update menu item
router.put('/menu/:id', (req, res) => {
    const itemID = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = menuItems.findIndex(item => item.id === itemID);
    if (index !== -1) {
        menuItems[index] = {...menuItems[index], ...updatedItem };
        res.json({ message: 'Menu item successfully updated', updatedItem: menuItems[index] });
    } else {
        res.status(404).json({ message: 'Menu item not found' });
    }
});

// Route to delete menu item
router.delete('/menu/:id', (req, res) => {
    const itemID = parseInt(req.params.id);
    const index = menuItems.finxIndex(item => item.id === itemID);
    if (index !== -1) {
        menuItems.splice(index, 1);
        res.json({ message: 'Menu item successfully deleted' });
    } else {
        res.status(404).json({ message: 'Menu item not found' });
    }
});

module.exports = router;