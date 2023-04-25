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



import { fetcher } from "./JS/fetch.js";
import { apiKey } from "./JS/API_Key.js";


fetcher(apiKey)









// ——————————*** MATCH CARD ITEM ***———————————
// Dynamic data
// const matchData = {
//     playtime: '62 : 24',
//     score: '2 - 2',
//     stats: {
//       left: {
//         shotsOnTarget: 7,
//         shoot: 12,
//         fouls: 7,
//       },
//       right: {
//         shotsOnTarget: 3,
//         shoot: 7,
//         fouls: 3,
//       },
//     },
//   };
  
  // Update playtime and score
  // document.getElementById('playtime-value').textContent = matchData.playtime;
  // document.getElementById('score-value').textContent = matchData.score;
  
  // // Update stats
  // document.getElementById('left-shots-on-target').textContent =
  //   matchData.stats.left.shotsOnTarget;
  // document.getElementById('right-shots-on-target').textContent =
  //   matchData.stats.right.shotsOnTarget;
  
  // document.getElementById('left-shoot').textContent = matchData.stats.left.shoot;
  // document.getElementById('right-shoot').textContent = matchData.stats.right.shoot;
  
  // document.getElementById('left-fouls').textContent = matchData.stats.left.fouls;
  // document.getElementById('right-fouls').textContent = matchData.stats.right.fouls;
  


 