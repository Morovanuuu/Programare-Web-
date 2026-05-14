const animeList = [
    { 
        id: 1, 
        titlu: "Jujutsu Kaisen", 
        gen: "Action", 
        eps: 24,
        imagine: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
    },
    { 
        id: 2, 
        titlu: "Spy x Family", 
        gen: "Comedy", 
        eps: 25,
        imagine: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg"
    },
    { 
        id: 3, 
        titlu: "Solo Leveling", 
        gen: "Fantasy", 
        eps: 12,
        imagine: "https://cdn.myanimelist.net/images/anime/1744/133300.jpg"
    },
    { 
        id: 4, 
        titlu: "One Piece", 
        gen: "Adventure", 
        eps: 1100,
        imagine: "https://cdn.myanimelist.net/images/anime/6/73245.jpg"
    },
    { 
        id: 5, 
        titlu: "JoJo's Bizarre Adventure", 
        gen: "Action", 
        eps: 190,
        imagine: "https://cdn.myanimelist.net/images/anime/3/40409.jpg"
    },
    { 
        id: 6, 
        titlu: "Attack on Titan", 
        gen: "Action", 
        eps: 89,
        imagine: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
    },
    { 
        id: 7, 
        titlu: "Death Note", 
        gen: "Mystery", 
        eps: 37,
        imagine: "https://cdn.myanimelist.net/images/anime/9/9453.jpg"
    }
];

module.exports = {
    getAll: () => animeList,
    findById: (id) => animeList.find(a => a.id === parseInt(id))
};