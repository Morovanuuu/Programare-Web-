// db/users.js
const users = []; // aici sunt stocati utilizatorii in memorie

module.exports = {
    getAll: () => users,
    findByUsername: (username) => users.find(u => u.username === username),
    add: (user) => users.push(user)
};