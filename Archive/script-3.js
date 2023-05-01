const proxyUrl = '/api';
const apiUrl = 'https://v3.football.api-sports.io';

async function fetchLeagueAndStats(teamId, apiKey) {
  const headers = {
    'x-apisports-key': apiKey,
  };

  const teamStatsUrl = `${proxyUrl}${apiUrl}/teams/${teamId}/statistics`; // use the proxy server URL to fetch the data
  const teamStatsResponse = await fetch(teamStatsUrl, { headers });
  const teamStatsData = await teamStatsResponse.json();
  const stats = teamStatsData.data;

  const leagueId = stats.league.id;
  const leagueUrl = `${proxyUrl}${apiUrl}/leagues/${leagueId}`; // use the proxy server URL to fetch the data
  const leagueResponse = await fetch(leagueUrl);
  const leagueData = await leagueResponse.json();
  const league = leagueData.data;

  document.querySelector('#league-name').innerText = league.name;
  document.querySelector('#league-year').innerText = league.season;
  document.querySelector('#league-country').innerText = league.country;

  document.querySelector('#nr-of-matches').innerText = stats.fixtures.played.total;
  document.querySelector('#matches-home').innerText = stats.fixtures.played.home;
  document.querySelector('#matches-away').innerText = stats.fixtures.played.away;

  document.querySelector('#nr-of-goals').innerText = stats.goals.total;
  document.querySelector('#goals-home').innerText = stats.goals.home;
  document.querySelector('#goals-away').innerText = stats.goals.away;

  document.querySelector('#avg-nr-of-goals').innerText = (stats.goals.total / stats.fixtures.played.total).toFixed(1);
  document.querySelector('#avg-goals-home').innerText = (stats.goals.home / stats.fixtures.played.home).toFixed(1);
  document.querySelector('#avg-goals-away').innerText = (stats.goals.away / stats.fixtures.played.away).toFixed(1);

  document.querySelector('#nr-of-wins').innerText = stats.fixtures.wins.total;
  document.querySelector('#wins-home').innerText = stats.fixtures.wins.home;
  document.querySelector('#wins-away').innerText = stats.fixtures.wins.away;

  document.querySelector('#nr-of-draws').innerText = stats.fixtures.draws.total;
  document.querySelector('#draws-home').innerText = stats.fixtures.draws.home;
  document.querySelector('#draws-away').innerText = stats.fixtures.draws.away;

  document.querySelector('#nr-of-losses').innerText = stats.fixtures.loses.total;
  document.querySelector('#losses-home').innerText = stats.fixtures.loses.home;
  document.querySelector('#losses-away').innerText = stats.fixtures.loses.away;
}


document.getElementById('search-button').addEventListener('click', async () => {
  console.log("Button clicked");
  const teamName = document.getElementById('team-input').value;
  const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';

  if (teamName) {
    const searchUrl = `${apiUrl}/teams?search=${teamName}`;
    const teamResponse = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': apiKey
      }
    });

    const teamData = await teamResponse.json();

    if (teamData && teamData.data && teamData.data.length > 0) {
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
