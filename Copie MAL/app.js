require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Setarea motorului de template si a folderului de vizualizari
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares Globale
app.use(express.urlencoded({ extended: true })); // Pentru a parsa formularele
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Middleware-ul tau  custom de logare in consola 
const logger = require('./middleware/logger');
app.use(logger);

// Rutele pentru autentificare si pentru anime
const authRoutes = require('./routes/auth');
const animeRoutes = require('./routes/anime');

app.use('/', authRoutes);
app.use('/anime', animeRoutes);

// Redirect la pagina de login daca utilizatorul acceseaza radacina
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`🚀 Serverul a pornit pe http://localhost:${PORT}`);
});