const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('../db/users');

router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/anime');
    // Adaugam si success: null cand incarcam prima data pagina
    res.render('login', { error: null, success: null });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users.findByUsername(username)) {
        return res.render('login', { error: 'Utilizatorul exista deja!', success: null });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.add({ username, password: hashedPassword });
    
    // Aici e magia: trimitem mesajul prin variabila success, iar error ramane null!
    res.render('login', { error: null, success: 'Cont creat cu succes! Te poti loga.' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = { username: user.username };
        req.session.views = 0; 
        
        res.cookie('theme', 'dark', { maxAge: 900000 }); 
        return res.redirect('/anime');
    }
    res.render('login', { error: 'Date incorecte!', success: null });
});

// --- RUTE SCHIMBA PAROLA ---
router.get('/schimba-parola', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('user/schimba-parola', { theme: req.cookies.theme || 'light' });
});

router.post('/schimba-parola', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    
    const { parolaVeche, parolaNoua } = req.body;
    const currentUser = users.findByUsername(req.session.user.username);
    
    if (currentUser && await bcrypt.compare(parolaVeche, currentUser.password)) {
        const hashedNewPassword = await bcrypt.hash(parolaNoua, 10);
        users.updatePassword(currentUser.username, hashedNewPassword);
        res.redirect('/profil'); 
    } else {
        res.send("Parola veche este incorecta! <a href='/schimba-parola'>Incearca din nou</a>");
    }
});

// --- RUTE STERGE CONT ---
router.get('/sterge-cont', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('user/sterge-cont', { theme: req.cookies.theme || 'light' });
});

router.post('/sterge-cont', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    users.remove(req.session.user.username);
    req.session.destroy(() => {
        res.clearCookie('theme');
        res.redirect('/login');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('theme');
    res.redirect('/login');
});

module.exports = router;