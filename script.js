// ——————————*** MATCH CARD ITEM ***———————————
// Dynamic data
const matchData = {
    playtime: '62 : 24',
    score: '2 - 2',
    stats: {
      left: {
        shotsOnTarget: 7,
        shoot: 12,
        fouls: 7,
      },
      right: {
        shotsOnTarget: 3,
        shoot: 7,
        fouls: 3,
      },
    },
  };
  
  // Update playtime and score
  document.getElementById('playtime-value').textContent = matchData.playtime;
  document.getElementById('score-value').textContent = matchData.score;
  
  // Update stats
  document.getElementById('left-shots-on-target').textContent =
    matchData.stats.left.shotsOnTarget;
  document.getElementById('right-shots-on-target').textContent =
    matchData.stats.right.shotsOnTarget;
  
  document.getElementById('left-shoot').textContent = matchData.stats.left.shoot;
  document.getElementById('right-shoot').textContent = matchData.stats.right.shoot;
  
  document.getElementById('left-fouls').textContent = matchData.stats.left.fouls;
  document.getElementById('right-fouls').textContent = matchData.stats.right.fouls;
  

// ——————————*** TEAM OVERVIEW ITEM ***———————————

import { fetcher } from "./JS/fetch.js";
import { apiKey } from "./JS/API_Key.js";


fetcher(apiKey)