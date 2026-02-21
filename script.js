const games = [
  {
    name: "LUCKROT",
    status: "upcoming",
    genre: "Action Roguelike",
    platform: "PC",
    description: "Dystopian shooter where your survival is live entertainment.",
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3823650/ss_42fe719ec2dc3fce43ecf4324d3ea343e0fe16ec.600x338.jpg",
  },
  {
    name: "Last Signal",
    status: "live",
    genre: "Tactical Horror",
    platform: "PC / Console",
    description: "Co-op survival runs inside unstable satellite bunkers.",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Neon Kinetics",
    status: "prototype",
    genre: "Arena Shooter",
    platform: "PC",
    description: "Hyper-fast movement combat with rewind-based weapons.",
    image:
      "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Shiverline",
    status: "live",
    genre: "Extraction FPS",
    platform: "PC",
    description: "PvPvE night raids in storm-eaten industrial districts.",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Pulse Cartel",
    status: "upcoming",
    genre: "Roguelite Deck Shooter",
    platform: "PC",
    description: "Blend gunplay with build crafting through high-risk contracts.",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Nullpoint",
    status: "prototype",
    genre: "Immersive Sim",
    platform: "PC",
    description: "System-driven missions in a fractured orbital station.",
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1200&q=80",
  },
];

const grid = document.getElementById("games-grid");
const filterButtons = document.querySelectorAll("[data-filter]");

function toTitleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function cardTemplate(game) {
  return `
    <article class="game-card" data-status="${game.status}">
      <div class="game-art" style="background-image:url('${game.image}')"></div>
      <div class="game-body">
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <div class="game-meta">
          <span class="tag status-${game.status}">${toTitleCase(game.status)}</span>
          <span class="tag">${game.genre}</span>
          <span class="tag">${game.platform}</span>
        </div>
      </div>
    </article>
  `;
}

function updateStats() {
  const upcoming = games.filter((game) => game.status === "upcoming").length;
  const live = games.filter((game) => game.status === "live").length;

  document.getElementById("total-games").textContent = String(games.length);
  document.getElementById("upcoming-games").textContent = String(upcoming);
  document.getElementById("live-games").textContent = String(live);
}

function revealCards() {
  const cards = grid.querySelectorAll(".game-card");
  cards.forEach((card, index) => {
    window.setTimeout(() => {
      card.classList.add("is-visible");
    }, 50 + index * 70);
  });
}

function renderGames(filter = "all") {
  const selectedGames =
    filter === "all" ? games : games.filter((game) => game.status === filter);

  grid.innerHTML = selectedGames.map(cardTemplate).join("");
  revealCards();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((el) => el.classList.remove("is-active"));
    button.classList.add("is-active");
    renderGames(filter);
  });
});

updateStats();
renderGames();
