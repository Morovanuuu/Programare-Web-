const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const animeDB = require('../db/anime');

router.use(requireLogin); // Protejam toate rutele de aici cu middleware-ul custom

router.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    const animeList = animeDB.getAll();
    const theme = req.cookies.theme || 'light'; 

    res.render('anime/index', {
        user: req.session.user,
        views: req.session.views,
        animeList: animeList,
        theme: theme
    });
});

router.get('/:id', (req, res) => {
    const anime = animeDB.findById(req.params.id);
    if (!anime) return res.status(404).send('Anime-ul nu a fost gasit.');
    res.render('anime/detalii', { anime });
});

module.exports = router;