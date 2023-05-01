document.addEventListener('DOMContentLoaded', (event) => {
    const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';
    const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';

    async function fetchData(url, options) {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return await response.json();
    }

    async function getTeamIdByName(apiKey, teamName, teamCountry) {
        const searchUrl = `${apiUrl}/teams?search=${teamName}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };
        const searchData = await fetchData(searchUrl, options);
        console.log('API response:', searchData); // Log the API response
        if (searchData.results > 0) {
            const filteredResults = searchData.response.filter(team => team.country === teamCountry);
            if (filteredResults.length > 0) {
                return filteredResults[0].id;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }


    async function displayTeamInfoByName(apiKey, teamName, teamCountry) {
        const teamId = await getTeamIdByName(apiKey, teamName, teamCountry);
        if (teamId) {
            console.log('Team ID:', teamId); // Log the team ID to ensure it's being retrieved correctly
            await fetchAndDisplayTeamInfo(apiKey, teamId);
        } else {
            console.error('Team not found');
        }
    }


    async function fetchAndDisplayTeamInfo(apiKey, teamId) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };

        const teamUrl = `${apiUrl}/teams?id=${teamId}`;
        const teamData = await fetchData(teamUrl, options);
        const {
            team,
            venue
        } = teamData.response[0];

        const leagueUrl = `${apiUrl}/leagues?team=${teamId}`;
        const leagueData = await fetchData(leagueUrl, options);
        const league = leagueData.response[0].league;

        const statsUrl = `${apiUrl}/teams/statistics?league=${league.id}&season=${league.season}&team=${teamId}`;
        const statsData = await fetchData(statsUrl, options);
        const stats = statsData.response;

        updateHTML(stats, league, team, venue);
    }

    function updateHTML(stats, league, team, venue) {
        // Update team information
        document.querySelector('.team-img img').src = team.logo;
        document.querySelector('.team-facts h2').innerText = team.name;
        document.querySelector('.team-facts p:nth-child(2)').innerText = team.founded;
        document.querySelector('.team-facts p:nth-child(3)').innerText = team.country;

        // Update venue information
        document.getElementById('stadion-city').innerText = venue.city;
        document.getElementById('stadion-address').innerText = venue.address;
        document.getElementById('stadion-capacity').innerText = venue.capacity;
        document.getElementById('stadion-surface').innerText = venue.surface;
        document.getElementById('stadion-name').innerText = venue.name;
        document.getElementById('stadion-img').src = venue.photo;

        // Update league information
        document.getElementById('league-name').innerText = league.name;
        document.getElementById('league-year').innerText = league.season;
        document.getElementById('league-country').innerText = league.country;

        // Update team stats
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

    // Event listener for search button
    const searchButton = document.getElementById('search-button');
    const teamInput = document.getElementById('team-input');

    searchButton.addEventListener('click', () => {
        const teamName = teamInput.value;
        const teamCountry = "England"; // Replace with the desired country for the team
        displayTeamInfoByName(apiKey, teamName, teamCountry);
    });


    const defaultTeamName = "Arsenal";
    const defaultTeamCountry = "England";
    displayTeamInfoByName(apiKey, defaultTeamName, defaultTeamCountry);

});
