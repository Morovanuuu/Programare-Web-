const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('../db/users');

router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/anime');
    res.render('login', { error: null });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users.findByUsername(username)) {
        return res.render('login', { error: 'Utilizatorul exista deja!' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.add({ username, password: hashedPassword });
    res.render('login', { error: 'Cont creat cu succes! Te poti loga.' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = { username: user.username };
        req.session.views = 0; 
        
        //  Setez un cookie custom 
        res.cookie('theme', 'dark', { maxAge: 900000 }); 
        return res.redirect('/anime');
    }
    res.render('login', { error: 'Date incorecte!' });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('theme');
    res.redirect('/login');
});

module.exports = router;