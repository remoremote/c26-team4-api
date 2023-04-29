// Constants
const teamInfo = {
  img: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/FC_Red_Bull_Salzburg_logo.svg/166px-FC_Red_Bull_Salzburg_logo.svg.png?20201211205550",
  name: "Red Bull Salzburg",
  established: "1933",
  country: "Austria"
};

const stadionInfo = {
  name: "Red Bull Arena",
  city: "Wals-Siezenheim",
  address: "Stadionstrasse 2/3",
  capacity: "31895",
  surface: "grass",
  img: "https://e6.365dm.de/18/07/2048x1152/skysport_de-red-bull-salzburg_4372078.jpg?bypass-service-worker&20180726140407"
};

const leagueInfo = {
  name: "UEFA Champions League",
  year: "2022",
  country: "World"
};

const matchStats = {
  totalMatches: 6,
  homeMatches: 2,
  awayMatches: 3,
  totalGoals: 5,
  homeGoals: 2,
  awayGoals: 3,
  avgTotalGoals: 0.8,
  avgHomeGoals: 1.0,
  avgAwayGoals: 0.7,
  totalWins: 1,
  homeWins: 1,
  awayWins: 0,
  totalDraws: 3,
  homeDraws: 1,
  awayDraws: 2,
  totalLosses: 2,
  homeLosses: 1,
  awayLosses: 1
};

// Functions to update the DOM
function updateDOM() {
  document.querySelector(".team-img img").src = teamInfo.img;
  document.querySelector(".team-facts h2").textContent = teamInfo.name;
  document.querySelector(".team-facts p:nth-child(2)").textContent = teamInfo.established;
  document.querySelector(".team-facts p:nth-child(3)").textContent = teamInfo.country;

  document.getElementById("stadion-name").textContent = stadionInfo.name;
  document.getElementById("stadion-city").textContent = stadionInfo.city;
  document.getElementById("stadion-address").textContent = stadionInfo.address;
  document.getElementById("stadion-capacity").textContent = stadionInfo.capacity;
  document.getElementById("stadion-surface").textContent = stadionInfo.surface;
  document.getElementById("stadion-img").src = stadionInfo.img;

  document.getElementById("league-name").textContent = leagueInfo.name;
  document.getElementById("league-year").textContent = leagueInfo.year;
  document.getElementById("league-country").textContent = leagueInfo.country;

  document.getElementById("nr-of-matches").textContent = matchStats.totalMatches;
  document.getElementById("matches-home").textContent = matchStats.homeMatches;
  document.getElementById("matches-away").textContent = matchStats.awayMatches;
  document.getElementById("nr-of-goals").textContent = matchStats.totalGoals;
  document.getElementById("goals-home").textContent = matchStats.homeGoals;
  document.getElementById("goals-away").textContent = matchStats.awayGoals;
  document.getElementById("avg-nr-of-goals").textContent = matchStats.avgTotalGoals;
  document.getElementById("avg-goals-home").textContent = matchStats.avgHomeGoals;
  document.getElementById("avg-goals-away").textContent = matchStats.avgAwayGoals;
  document.getElementById("nr-of-wins").textContent = matchStats.totalWins;
  document.getElementById("wins-home").textContent = matchStats.homeWins;
  document.getElementById("wins-away").textContent = matchStats.awayWins;
  document.getElementById("nr-of-draws").textContent = matchStats.totalDraws;
  document.getElementById("draws-home").textContent = matchStats.homeDraws;
  document.getElementById("draws-away").textContent = matchStats.awayDraws;
  document.getElementById("nr-of-losses").textContent = matchStats.totalLosses;
  document.getElementById("losses-home").textContent = matchStats.homeLosses;
  document.getElementById("losses-away").textContent = matchStats.awayLosses;
}

// Initialize the DOM with the data
document.addEventListener("DOMContentLoaded", () => {
  updateDOM();
});

// Fetcher function for API key
import { apiKey } from "./JS/API_Key.js";

document.querySelector(".search-input input").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchTerm = event.target.value.trim();
    if (searchTerm) {
      searchTeam(searchTerm);
    }
  }
});

async function searchTeam(teamName) {
  const response = await fetch(`https://v3.football.api-sports.io/teams?search=${teamName}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": apiKey
    }
  });

  const data = await response.json();
  if (data && data.results > 0) {
    const team = data.response[0].team;
    const venue = data.response[0].venue;
    teamInfo.img = team.logo;
    teamInfo.name = team.name;
    teamInfo.established = team.founded;
    teamInfo.country = team.country;

    stadionInfo.name = venue.name;
    stadionInfo.city = venue.city;
    stadionInfo.address = venue.address;
    stadionInfo.capacity = venue.capacity;
    stadionInfo.surface = venue.surface;
    stadionInfo.img = ""; // The API doesn't provide a stadium image, so you'll need to find another source or leave it empty

    // Fetch and update league and matchStats data here (similar to the example above)

    updateDOM();
  } else {
    alert("No team found. Please try again.");
  }
}