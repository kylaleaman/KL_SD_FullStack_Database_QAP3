const express = require('express');
const router = express.Router();

// Mock data for testing (typically use database queries)
let menuItems = [
    {id: 1, name: "Sugar Cookie Oat Latte", description: "Christmas in a cup - espresso, oat milk and sugar cookie syrup", price: 4.50, availability: true},
    {id: 2, name: "Cookies n Cream Cakepop", description: "Chocolate cake dipped in cookies n cream chocolate", price: 1.50, availability: true},
    {id: 3, name: "Green Tea Lemonage", description: "Green tea lemonade with your choice of flavour", price: 3.50, availability: false},
    {id: 4, name: "Pink Drink", description: "Strawberry Quencher made with Coconut Milk", price: 2.50, availability: false}
];

// Route to render menu page
router.get('/menu', (req, res) => {
    res.render('menu', { menuItems });
});

// Route to render add new item page
router.get('/menu/add', (req, res) => {
    res.render('addMenuItem');
});

// Route to render update item page 
router.get('/menu/delete/ :id', (req, res) => {
    const itemId = req.params.id;
    const menuItem = menuItems.find(item => item.id === parseInt(itemId));
    if (!menuItem) {
        res.status(404).send('Menu item not found');
        return;
    }
    res.render('updateMenuItem', { menuItem });
});

// Route to render delete item page
router.get('/menu/delete/:id', (req, res) => {
    const itemID = req.params.id;
    const menuItem = menuItems.find(item => item.id === parseInt(itemId));
    if (!menuItem) {
        res.status(404).send('Menu item not found');
        return;
    }
    res.render('deleteMenuItem', { menuItem });
});

// // Route to render cart page
// router.get('/cart', (req, res) => {
//     // Logic to fetch cart items (not implemented yet)
//     const cartItems = [];
//     res.render('cart', { cartItems });
//   });
  
//   // Route to render checkout page
//   router.get('/checkout', (req, res) => {
//     // Logic to fetch cart items and calculate total price (not implemented yet)
//     const cartItems = [];
//     const totalPrice = 0; // Calculate total price here
//     res.render('checkout', { cartItems, totalPrice });
//   });
  
//   // Route to render order history page
//   router.get('/orders', (req, res) => {
//     // Logic to fetch order history for the current user (not implemented yet)
//     const orderHistory = [];
//     res.render('orderHistory', { orderHistory });
//   });
  
//   module.exports = router;

