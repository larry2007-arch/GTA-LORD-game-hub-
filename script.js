
const games = [
    {
        id: '1', 
        name: 'Space Invaders', 
        image: 'https://via.placeholder.com/200x150.png?text=Space+Invaders', 
        path: 'games/space-invaders/index.html' 
    },
    { 
        id: '2', 
        name: 'Pixel Run', 
        image: 'https://via.placeholder.com/200x150.png?text=Pixel+Run', 
        path: 'games/pixel-run/index.html' 
    },
    { 
        id: '3', 
        name: 'Cosmic Quest', 
        image: 'https://via.placeholder.com/200x150.png?text=Cosmic+Quest', 
        path: 'games/cosmic-quest/index.html' 
    },
    { 
        id: '4', 
        name: 'Pong', 
        image: 'https://via.placeholder.com/200x150.png?text=Pong', 
        path: 'games/pong/index.html' 
    }
];

// ... (rest of your scripts.js code) ...

document.addEventListener('DOMContentLoaded', () => {
    const welcomeSection = document.getElementById('welcome-section');
    const loginForm = document.getElementById('login-form');
    const dashboardSection = document.getElementById('dashboard-section');
    const gamesContainer = document.getElementById('games-container');
    const activePlayersList = document.getElementById('active-players-list');
    const gameSection = document.getElementById('game-section');
    const backToDashboardBtn = document.getElementById('back-to-dashboard');
    const welcomeMessage = document.getElementById('welcome-message');

    // This array acts as our mock database for games
    const games = [
        { id: '1', name: 'Space Invaders', image: 'https://via.placeholder.com/200x150.png?text=Space+Invaders', path: 'games/space-invaders/index.html' },
        { id: '2', name: 'Pixel Run', image: 'https://via.placeholder.com/200x150.png?text=Pixel+Run', path: 'games/pixel-run/index.html' },
        { id: '3', name: 'Cosmic Quest', image: 'https://via.placeholder.com/200x150.png?text=Cosmic+Quest', path: 'games/cosmic-quest/index.html' }
    ];

    // This array acts as our mock list of active players
    const mockActivePlayers = [
        { username: 'PlayerOne', game: 'Browsing Games' },
        { username: 'GTALord', game: 'Pixel Run' },
        { username: 'EpicGamer', game: 'Space Invaders' }
    ];

    function showSection(sectionId) {
        document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');
    }

    function renderGames() {
        gamesContainer.innerHTML = '';
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <h4>${game.name}</h4>
            `;
            gameCard.addEventListener('click', () => loadGame(game));
            gamesContainer.appendChild(gameCard);
        });
    }

    function loadGame(game) {
        showSection('game-section');
        const playerContainer = document.getElementById('game-player-container');
        playerContainer.innerHTML = `<iframe src="${game.path}"></iframe>`;
        updateActivePlayers(localStorage.getItem('username'), game.name);
    }

    function updateActivePlayers(username, game) {
        const updatedPlayers = mockActivePlayers.map(p => {
            if (p.username === username) {
                return { username, game };
            }
            return p;
        });
        renderActivePlayers(updatedPlayers);
    }

    function renderActivePlayers(players) {
        activePlayersList.innerHTML = '';
        players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.textContent = `${player.username} is playing ${player.game}`;
            activePlayersList.appendChild(listItem);
        });
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        if (username) {
            localStorage.setItem('username', username);
            initializeDashboard(username);
        } else {
            alert('Please enter a username.');
        }
    });

    backToDashboardBtn.addEventListener('click', () => {
        showSection('dashboard-section');
        updateActivePlayers(localStorage.getItem('username'), 'Browsing Games');
    });

    function initializeDashboard(username) {
        welcomeMessage.textContent = `Welcome, ${username}!`;
        showSection('dashboard-section');
        renderGames();
        renderActivePlayers(mockActivePlayers);
        updateActivePlayers(username, 'Browsing Games');
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        initializeDashboard(storedUsername);
    } else {
        showSection('welcome-section');
    }
});
