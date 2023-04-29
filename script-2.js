async function fetchStadiumData(stadiumId) {
    const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';
    const searchUrl = `https://api-football-v1.p.rapidapi.com/v3/venues?id=${stadiumId}`;
  
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey
      }
    });
  
    const data = await response.json();
    return data;
  }
  
  async function fetchLeagueData(leagueId) {
    const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';
    const searchUrl = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${leagueId}`;
  
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey
      }
    });
  
    const data = await response.json();
    return data;
  }
  
  async function fetchTeamStats(teamId, leagueId) {
    const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';
    const searchUrl = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?team=${teamId}&league=${leagueId}`;
  
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey
      }
    });
  
    const data = await response.json();
    return data.response;
  }

// Get the input element
const input = document.querySelector('.input-item input');

// Update data function
async function updateData(teamName) {
  const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';
  const searchUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${teamName}`;

  const response = await fetch(searchUrl, {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey
      }
  });

  const data = await response.json();
  const team = data.response[0].team;

  console.log('team:', team);


  document.querySelector('.team-img img').src = team.logo;
  document.querySelector('.team-facts h2').textContent = team.name;
  document.querySelector('.team-facts p:nth-child(2)').textContent = team.founded;
  document.querySelector('.team-facts p:nth-child(3)').textContent = team.country;


  const leagueId = team.league ? team.league.id : null; // Check if team.league exists before accessing its properties

      // Fetch stadium, league, and match stats data and update the UI accordingly
      const stadiumData = await fetchStadiumData(team.venue_id);
      const stadium = (stadiumData.response.length > 0) ? stadiumData.response[0].venue : undefined;
    
      const leagueData = leagueId ? await fetchLeagueData(leagueId) : { response: [] }; // Fetch league data only if leagueId is not null
      const league = leagueData.response.length > 0 ? leagueData.response[0].league : undefined;
    

  const teamStats = await fetchTeamStats(team.id, team.league.id); 
  const statistics = teamStats.response[0];
  console.log('teamStats:', teamStats);


    
    // Update stadium data only if 'stadium' is defined
  if (stadium) {
    document.querySelector('.stadion-details #stadion-city').textContent = stadium.city;
    document.querySelector('.stadion-details #stadion-address').textContent = stadium.address;
    document.querySelector('.stadion-details #stadion-capacity').textContent = stadium.capacity;
    document.querySelector('.stadion-details #stadion-surface').textContent = stadium.surface;
    document.querySelector('.stadion-img #stadion-name').textContent = stadium.name;
    document.querySelector('.stadion-img img').src = stadium.image;
  } else {
    // Clear the stadium data in the UI if the 'stadium' is not available
    document.querySelector('.stadion-details #stadion-city').textContent = '';
    document.querySelector('.stadion-details #stadion-address').textContent = '';
    document.querySelector('.stadion-details #stadion-capacity').textContent = '';
    document.querySelector('.stadion-details #stadion-surface').textContent = '';
    document.querySelector('.stadion-img #stadion-name').textContent = '';
    document.querySelector('.stadion-img img').src = '';
  }
    
    // Update league data
    if (league) {
        document.querySelector('.league-info #league-name').textContent = league.name;
        document.querySelector('.league-info #league-year').textContent = league.season;
        document.querySelector('.league-info #league-country').textContent = league.country;
      } else {
        // Clear the league data in the UI if the 'league' is not available
        document.querySelector('.league-info #league-name').textContent = '';
        document.querySelector('.league-info #league-year').textContent = '';
        document.querySelector('.league-info #league-country').textContent = '';
      }
    
// Update match stats
document.getElementById('nr-of-matches').textContent = teamStats.statistics.played.total;
document.getElementById('matches-home').textContent = teamStats.statistics.played.home;
document.getElementById('matches-away').textContent = teamStats.statistics.played.away;

// Update goals
document.querySelector('.card-goals #nr-of-goals').textContent = teamStats.statistics.goals.total;
document.querySelector('.card-goals #goals-home').textContent = teamStats.statistics.goals.home;
document.querySelector('.card-goals #goals-away').textContent = teamStats.statistics.goals.away;

// Update average goals
document.getElementById('avg-nr-of-goals').textContent = (teamStats.statistics.goals.total / teamStats.statistics.played.total).toFixed(1);
document.getElementById('avg-goals-home').textContent = (teamStats.statistics.goals.home / teamStats.statistics.played.home).toFixed(1);
document.getElementById('avg-goals-away').textContent = (teamStats.statistics.goals.away / teamStats.statistics.played.away).toFixed(1);

// Update wins
document.getElementById('nr-of-wins').textContent = teamStats.statistics.wins.total;
document.getElementById('wins-home').textContent = teamStats.statistics.wins.home;
document.getElementById('wins-away').textContent = teamStats.statistics.wins.away;

// Update draws
document.getElementById('nr-of-draws').textContent = teamStats.statistics.draws.total;
document.getElementById('draws-home').textContent = teamStats.statistics.draws.home;
document.getElementById('draws-away').textContent = teamStats.statistics.draws.away;

// Update losses
document.getElementById('nr-of-losses').textContent = teamStats.statistics.loses.total;
document.getElementById('losses-home').textContent = teamStats.statistics.loses.home;
document.getElementById('losses-away').textContent = teamStats.statistics.loses.away;



  }
  
  let timeout;


  
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', () => {
    const teamName = input.value.trim(); // Remove leading/trailing whitespace characters
    if (teamName.length > 0) {
      updateData(teamName);
    } else {
      console.log('Please enter a valid team name');
    }
  });
  

// Set a placeholder image when the image fails to load
document.querySelector('.team-img img').addEventListener('error', (e) => {
    e.target.src = 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg';
  });
  document.querySelector('.stadion-img img').addEventListener('error', (e) => {
    e.target.src = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';
  });