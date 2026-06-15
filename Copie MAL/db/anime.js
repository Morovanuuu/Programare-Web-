const animeList = [
    { 
        id: 1, 
        titlu: "Jujutsu Kaisen", 
        gen: "Action", 
        eps: 24,
        scor: "8.7",
        descriere: "Un baiat de liceu inghite un deget blestemat pentru a rupe un blestem si ajunge sa imparta corpul cu regele blestemelor. Ulterior, se alatura unei scoli de magicieni.",
        imagine: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
    },
    { 
        id: 2, 
        titlu: "Spy x Family", 
        gen: "Comedy", 
        eps: 25,
        scor: "8.5",
        descriere: "Un spion de elita trebuie sa isi construiasca o familie falsa pentru o misiune secreta. Ceea ce nu stie este ca sotia pe care a ales-o este un ucigas platit.",
        imagine: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg"
    },
    { 
        id: 3, 
        titlu: "Solo Leveling", 
        gen: "Fantasy", 
        eps: 12,
        scor: "8.6",
        descriere: "Intr-o lume in care vanatorii lupta cu monstri, cel mai slab vanator din lume, Jinwoo Sung, primeste o abilitate unica de a creste in nivel fara limite.",
        imagine: "https://cdn.myanimelist.net/images/anime/1744/133300.jpg"
    },
    { 
        id: 4, 
        titlu: "One Piece", 
        gen: "Adventure", 
        eps: 1100,
        scor: "8.7",
        descriere: "Monkey D. Luffy refuza sa lase ceva sa ii stea in cale in ambitia sa de a deveni regele piratilor, explorand marile in cautarea celei mai mari comori din lume.",
        imagine: "https://cdn.myanimelist.net/images/anime/6/73245.jpg"
    },
    { 
        id: 5, 
        titlu: "JoJo's Bizarre Adventure", 
        gen: "Action", 
        eps: 190,
        scor: "8.4",
        descriere: "Povestea familiei Joestar, ai carei membri descopera ca sunt destinati sa distruga inamici supranaturali folosindu-se de puteri mistice si entitati numite Stands.",
        imagine: "https://cdn.myanimelist.net/images/anime/3/40409.jpg"
    },
    { 
        id: 6, 
        titlu: "Attack on Titan", 
        gen: "Action", 
        eps: 89,
        scor: "9.1",
        descriere: "Omenirea traieste in spatele unor ziduri uriase pentru a se proteja de Titani. Cand un Titan colosal distruge zidul, lupta disperata pentru supravietuire incepe.",
        imagine: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
    },
    { 
        id: 7, 
        titlu: "Death Note", 
        gen: "Mystery", 
        eps: 37,
        scor: "8.6",
        descriere: "Un student gaseste un carnet mistic care are puterea de a ucide pe oricine. El incepe o cruciada secreta declansand un joc de sah cu cel mai bun detectiv din lume.",
        imagine: "https://cdn.myanimelist.net/images/anime/9/9453.jpg"
    }
];

module.exports = {
    getAll: () => animeList,
    findById: (id) => animeList.find(a => a.id === parseInt(id))
};