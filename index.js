const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

//Routes
const apiRoutes = require('./routes/apiRoutes');
const uiRoutes = require('./routes/uiRoutes');
app.use('/api', apiRoutes);
app.use('/', uiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});