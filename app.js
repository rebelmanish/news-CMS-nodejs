const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('dotenv').config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(expressLayouts);
app.set('layout', 'layout');

app.set('view engine', 'ejs');

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
    

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

app.use(flash());


// Routes

app.use('/', require('./routes/frontend') );

app.use('/admin', (req, res, next)=>{
    res.locals.layout = 'admin/layout';
    next(); 
} );
app.use('/admin', require('./routes/admin') );



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
