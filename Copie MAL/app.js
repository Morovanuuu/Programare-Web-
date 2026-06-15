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
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/toggle-theme', (req, res) => {
    const currentTheme = req.cookies.theme || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    res.cookie('theme', newTheme);
    res.redirect('/anime');
});


// Trebuie sa importam baza de date a utilizatorilor sus (sau fix deasupra rutei)
const usersDB = require('./db/users');

app.get('/profil', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    // Luam numarul real de vizionate din baza de date
    const nrVizionate = usersDB.getWatchedCount(req.session.user.username);

    res.render('user/profil', {
        user: req.session.user,
        views: req.session.views || 0,
        theme: req.cookies.theme || 'light',
        vizionate: nrVizionate, // 
        genPreferat: 'Action' //
    });
});


app.listen(PORT, () => {
    console.log(`🚀 Serverul a pornit pe http://localhost:${PORT}`);
});