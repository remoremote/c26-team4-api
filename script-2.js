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
const input = document.querySelector('#team-input');

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        updateData(event.target.value);
    }
});

// Update data function
async function updateData(teamName) {
    const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';
    const searchUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?name=${teamName}`;

    const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
        },
    });

    const data = await response.json();

    await handleTeamData(data);
}

async function handleTeamData(data) {
    const team = data.response[0].team;

    console.log('team:', team);

    const leagueId = team.league ? team.league.id : null;

    if (leagueId) {
        // Use Promise.all to fetch data in parallel
        const [stadiumData, leagueData, teamStats] = await Promise.all([
            fetchStadiumData(team.venue_id),
            fetchLeagueData(leagueId),
            fetchTeamStats(team.id, leagueId)
        ]);

        updateUI(stadiumData, leagueData, teamStats);
    } else {
        updateUI(null, null, null);
    }
}

// Fetch stadium, league, and match stats data and update the UI accordingly
const stadiumData = await fetchStadiumData(team.venue_id);
const stadium = (stadiumData.response.length > 0) ? stadiumData.response[0].venue : undefined;

const leagueData = leagueId ? await fetchLeagueData(leagueId) : {
    response: []
}; // Fetch league data only if leagueId is not null
const league = leagueData.response.length > 0 ? leagueData.response[0].league : undefined;


const teamStats = team.league ? await fetchTeamStats(team.id, team.league.id) : null;
const statistics = teamStats.response[0];
console.log('teamStats:', teamStats);

function updateUI(stadiumData, leagueData, teamStats) {
    const stadium = (stadiumData && stadiumData.response.length > 0) ? stadiumData.response[0].venue : undefined;
    const league = (leagueData && leagueData.response.length > 0) ? leagueData.response[0].league : undefined;


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



    if (teamStats) {
        const statistics = teamStats.response[0];
        // Update match stats
        document.querySelector('#nr-of-matches').textContent = teamStats.played.total;
        document.querySelector('#matches-home').textContent = teamStats.played.home;
        document.querySelector('#matches-away').textContent = teamStats.played.away;

        // Update goals
        document.querySelector('.card-goals #nr-of-goals').textContent = teamStats.goals.total;
        document.querySelector('.card-goals #goals-home').textContent = teamStats.goals.home;
        document.querySelector('.card-goals #goals-away').textContent = teamStats.goals.away;

        // Update average goals
        document.getElementById('avg-nr-of-goals').textContent = (teamStats.goals.total / teamStats.played.total).toFixed(1);
        document.getElementById('avg-goals-home').textContent = (teamStats.goals.home / teamStats.played.home).toFixed(1);
        document.getElementById('avg-goals-away').textContent = (teamStats.goals.away / teamStats.played.away).toFixed(1);

        // Update wins
        document.getElementById('nr-of-wins').textContent = teamStats.wins.total;
        document.getElementById('wins-home').textContent = teamStats.wins.home;
        document.getElementById('wins-away').textContent = teamStats.wins.away;

        // Update draws
        document.getElementById('nr-of-draws').textContent = teamStats.draws.total;
        document.getElementById('draws-home').textContent = teamStats.draws.home;
        document.getElementById('draws-away').textContent = teamStats.draws.away;

        // Update losses
        document.getElementById('nr-of-losses').textContent = teamStats.loses.total;
        document.getElementById('losses-home').textContent = teamStats.loses.home;
        document.getElementById('losses-away').textContent = teamStats.loses.away;


    } else {
        // Clear the data in the UI if 'teamStats' is not available
        const elementsToUpdate = [
            '#nr-of-matches', '#matches-home', '#matches-away',
            '#nr-of-goals', '#goals-home', '#goals-away',
            '#avg-nr-of-goals', '#avg-goals-home', '#avg-goals-away',
            '#nr-of-wins', '#wins-home', '#wins-away',
            '#nr-of-draws', '#draws-home', '#draws-away',
            '#nr-of-losses', '#losses-home', '#losses-away'
        ];

        elementsToUpdate.forEach(selector => {
            document.querySelector(selector).textContent = '';
        });
    }

    console.log('stadiumData:', stadiumData);
    console.log('leagueData:', leagueData);
    console.log('teamStats:', teamStats);


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
