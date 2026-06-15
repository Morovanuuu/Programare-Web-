const users = []; // aici sunt stocati utilizatorii in memorie

module.exports = {
    getAll: () => users,
    findByUsername: (username) => users.find(u => u.username === username),
    
    // Cand adaugam un user nou, ii pregatim o lista goala de vizionate
    add: (user) => {
        user.watched = []; 
        users.push(user);
    },
    
    updatePassword: (username, newPassword) => {
        const user = users.find(u => u.username === username);
        if (user) user.password = newPassword;
    },
    
    remove: (username) => {
        const index = users.findIndex(u => u.username === username);
        if (index !== -1) users.splice(index, 1);
    },

    addWatched: (username, animeId) => {
        const user = users.find(u => u.username === username);
        if (user) {
            // Daca nu are lista (pentru conturile vechi de dinainte sa bagam functia), i-o cream
            if (!user.watched) user.watched = [];
            // Adaugam doar daca nu a mai fost adaugat
            if (!user.watched.includes(animeId)) {
                user.watched.push(animeId);
            }
        }
    },

    getWatchedCount: (username) => {
        const user = users.find(u => u.username === username);
        return (user && user.watched) ? user.watched.length : 0;
    }
};