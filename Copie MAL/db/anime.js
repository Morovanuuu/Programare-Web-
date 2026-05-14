const animeList = [
    { id: 1, titlu: "Jujutsu Kaisen", gen: "Action", eps: 24 },
    { id: 2, titlu: "Spy x Family", gen: "Comedy", eps: 25 },
    { id: 3, titlu: "Solo Leveling", gen: "Fantasy", eps: 12 },
    { id: 4, titlu: "One Piece", gen: "Adventure", eps: 1100 },
    { id: 5, titlu: "JoJo's Bizarre Adventure", gen: "Action", eps: 190 },
    { id: 6, titlu: "Attack on Titan", gen: "Action", eps: 89 },
    { id: 7, titlu: "Death Note", gen: "Mystery", eps: 37 }
];

module.exports = {
    getAll: () => animeList,
    findById: (id) => animeList.find(a => a.id === parseInt(id))
};