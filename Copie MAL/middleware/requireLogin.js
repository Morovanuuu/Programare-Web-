// middleware/requireLogin.js
// protejeaza rute care necesita autentificare, redirectionand utilizatorii neautentificati catre pagina de login
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

module.exports = requireLogin;