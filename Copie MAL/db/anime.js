// db/anime.js
// aici sunt stocate anime-urile in memorie
const animeList = [
    { id: 1, titlu: "Jujutsu Kaisen", gen: "Action", eps: 24 },
    { id: 2, titlu: "Spy x Family", gen: "Comedy", eps: 25 },
    { id: 3, titlu: "Solo Leveling", gen: "Fantasy", eps: 12 }
];

module.exports = {
    getAll: () => animeList,
    findById: (id) => animeList.find(a => a.id === parseInt(id))
};