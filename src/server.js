const express = require('express');
const path = require('path');
const hbs = require('hbs');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const nodemailer = require('nodemailer');


// inicializaciones 
const app = express();  // ejecuto exxpress
require('./config/passport'); // configuracion de passport

// configuraciones 
app.set('PORT', process.env.PORT || 4000);  // seteo puerto
app.set('view engine', 'hbs');  // uso Handelbars como front
app.set('views', path.join(__dirname, 'views')); // permito aceso a carpeta Views 
app.set('models', path.join(__dirname, 'models'));
hbs.registerPartials(path.join(__dirname, 'views/partials')); // indico carpeta partials de HBS
hbs.registerPartials(path.join(__dirname, 'views/users'));

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use(methodOverride('_method')); 

app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// variables globales  
app.use(( req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); 
    res.locals.error_msg = req.flash('error_msg'); 
    res.locals.error = req.flash('error'); // para passport
    res.locals.user = req.user || null; // verifico si estoy registrado
    next();
}); 

// rutas
app.use(require('./routes/index.routes'));  // traigo las rutas de la pagina web
app.use(require('./routes/users.routes'));  // traigo las rutas para manejo de usuarios

// archivos estáticos 
app.use(express.static(path.join(__dirname,'public')));

module.exports = app; 