const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// Import database functions
const { pool } = require('./dal/db');

//Routes
const apiRoutes = require('./routes/apiRoutes');
const uiRoutes = require('./routes/uiRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Inject database pool into routes
app.use('/api', apiRoutes(pool)); 
app.use('/', uiRoutes(pool));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});



