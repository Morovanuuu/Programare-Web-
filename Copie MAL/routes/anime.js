const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const animeDB = require('../db/anime');
const usersDB = require('../db/users'); // Importam DB-ul de useri

router.use(requireLogin);

router.get('/', (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    
    let animeList = animeDB.getAll();
    const theme = req.cookies.theme || 'light'; 
    const genFiltru = req.query.gen;
    const searchTerm = req.query.search; 

    if (genFiltru && genFiltru !== 'all') {
        animeList = animeList.filter(a => a.gen.toLowerCase() === genFiltru.toLowerCase());
    }

    if (searchTerm) {
        animeList = animeList.filter(a => a.titlu.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    res.render('anime/index', {
        user: req.session.user,
        views: req.session.views,
        animeList: animeList,
        theme: theme,
        genActiv: genFiltru || 'all',
        searchTerm: searchTerm || '' 
    });
});

// Ruta pentru a vizualiza detaliile
router.get('/:id', (req, res) => {
    const animeId = parseInt(req.params.id);
    const anime = animeDB.findById(animeId);
    const theme = req.cookies.theme || 'light';

    if (!anime) return res.status(404).send('Anime-ul nu a fost gasit.');

    // Verificam daca user-ul l-a vizionat deja
    const userInDB = usersDB.findByUsername(req.session.user.username);
    const isWatched = userInDB && userInDB.watched && userInDB.watched.includes(animeId);
    
    res.render('anime/detalii', { 
        anime: anime,
        theme: theme,
        isWatched: isWatched // Trimitem raspunsul paginii EJS
    });
});

// R Pentru cand se apasa pe butonul "Adauga la Vizionate"
router.post('/:id/vizionat', (req, res) => {
    const animeId = parseInt(req.params.id);
    usersDB.addWatched(req.session.user.username, animeId);
    
    // Il intoarcem inapoi la pagina de detalii dupa ce s-a salvat
    res.redirect('/anime/' + animeId); 
});

module.exports = router;