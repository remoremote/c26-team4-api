const apiUrl = 'https://v3.football.api-sports.io';

async function fetchLeagueAndStats(teamId, apiKey) {
    const teamStatsUrl = `${apiUrl}/api/teams/${teamId}/statistics`;
    const teamStatsResponse = await fetch(teamStatsUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': apiKey
      }
    });
    const teamStatsData = await teamStatsResponse.json();
    const stats = teamStatsData.data;
  
    const leagueId = stats.league.id;
    const leagueUrl = `${apiUrl}/api/leagues/${leagueId}`;
    const leagueResponse = await fetch(leagueUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': apiKey
      }
    });
    const leagueData = await leagueResponse.json();
    const league = leagueData.data;
  
    document.getElementById('league-name').innerText = league.name;
    document.getElementById('league-year').innerText = league.season;
    document.getElementById('league-country').innerText = league.country;
  
    document.getElementById('nr-of-matches').innerText = stats.fixtures.played.total;
    document.getElementById('matches-home').innerText = stats.fixtures.played.home;
    document.getElementById('matches-away').innerText = stats.fixtures.played.away;
  
    document.getElementById('nr-of-goals').innerText = stats.goals.total;
    document.getElementById('goals-home').innerText = stats.goals.home;
    document.getElementById('goals-away').innerText = stats.goals.away;
  
    document.getElementById('avg-nr-of-goals').innerText = (stats.goals.total / stats.fixtures.played.total).toFixed(1);
    document.getElementById('avg-goals-home').innerText = (stats.goals.home / stats.fixtures.played.home).toFixed(1);
    document.getElementById('avg-goals-away').innerText = (stats.goals.away / stats.fixtures.played.away).toFixed(1);
  
    document.getElementById('nr-of-wins').innerText = stats.fixtures.wins.total;
    document.getElementById('wins-home').innerText = stats.fixtures.wins.home;
    document.getElementById('wins-away').innerText = stats.fixtures.wins.away;
  
    document.getElementById('nr-of-draws').innerText = stats.fixtures.draws.total;
    document.getElementById('draws-home').innerText = stats.fixtures.draws.home;
    document.getElementById('draws-away').innerText = stats.fixtures.draws.away;
  
    document.getElementById('nr-of-losses').innerText = stats.fixtures.loses.total;
    document.getElementById('losses-home').innerText = stats.fixtures.loses.home;
    document.getElementById('losses-away').innerText = stats.fixtures.loses.away;
  }
  
  document.getElementById('search-button').addEventListener('click', async () => {
    console.log("Button clicked"); 
    const teamName = document.getElementById('team-input').value;
    const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';
  
    if (teamName) {
      const searchUrl = `${apiUrl}/api/teams?search=${teamName}`;
      const teamResponse = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': apiKey
        }
      });
  
      const teamData = await teamResponse.json();
  
      if (teamData && teamData.data.length > 0) {
        const team = teamData.data[0];
        const venueUrl = `${apiUrl}/api/venues?id=${team.venue.id}`;
        const venueResponse = await fetch(venueUrl, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': apiKey
          }
        });
  
        const venueData = await venueResponse.json();
        const venue = venueData.data[0];
  
        // Update HTML elements with fetched data
        document.querySelector('.team-img img').src = team.logo;
        document.querySelector('.team-facts h2').innerText = team.name;
        document.querySelector('.team-facts p:nth-child(2)').innerText = team.founded;
        document.querySelector('.team-facts p:nth-child(3)').innerText = team.country;
  
        document.getElementById('stadion-city').innerText = venue.city;
        document.getElementById('stadion-address').innerText = venue.address;
        document.getElementById('stadion-capacity').innerText = venue.capacity;
        document.getElementById('stadion-surface').innerText = venue.surface;
  
        // Fetch and update league and stats data
        await fetchLeagueAndStats(team.id, apiKey);
      }
    }
  });
  
