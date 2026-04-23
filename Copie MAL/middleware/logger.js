// middleware/logger.js
// afiseaza in consola metoda, url-ul si utilizatorul (daca e logat) pentru fiecare cerere
const logger = (req, res, next) => {
    const user = req.session && req.session.user ? req.session.user.username : 'Guest';
    console.log(`${req.method} ${req.url} - user: ${user}`);
    next();
};

module.exports = logger;