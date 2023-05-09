document.addEventListener('DOMContentLoaded', (event) => {
    const apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';
    const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';

    async function fetchData(url, options) {
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                console.error('API error:', await response.text());
                throw new Error(`HTTP error ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Network error:', error);
            // You can show a user-friendly message here, e.g.:
            alert('There was an issue fetching the data. Please try again later.');
            throw error;
        }
    }

    async function getTeamIdByName(apiKey, teamName) {
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
            // Iterate over the results and return the team ID if the name matches
            for (let team of searchData.response) {
                console.log('Team:', team); // Log the team object
                console.log('Teams found:', searchData.response); //see all the teams found in the response
                if (team.team.name.toLowerCase() === teamName.toLowerCase()) {
                    return team.team.id;
                }
            }
        }
        return null;
    }
    
    function displayNotFoundMessage() {
        const notFoundMessage = "Team not found";
        document.querySelector('.team-facts h2').innerText = notFoundMessage;
        // Add any other elements you want to clear or update when the team is not found
    }
    
    async function fetchAndDisplayTeamStats(apiKey, teamId, season) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        };
    
        const teamUrl = `${apiUrl}/teams?id=${teamId}`;
        const teamData = await fetchData(teamUrl, options);
        const team = teamData.response[0].team;
        const venue = teamData.response[0].venue;
    
        const leagueUrl = `${apiUrl}/leagues?team=${teamId}`;
        const leagueData = await fetchData(leagueUrl, options);
        const league = leagueData.response[0].league;
    
        const statsUrl = `${apiUrl}/teams/statistics?league=${league.id}&season=${season}&team=${teamId}`;
        const statsData = await fetchData(statsUrl, options);
        const stats = statsData.response;
    
        updateHTML(stats[0], league, team, venue); // Update stats, instead of the whole stats object
    
        console.log("stats:", stats);
        console.log("league:", league);
        console.log("team:", team);
        console.log("venue:", venue);
    }
      
    
    async function fetchAndDisplayTeamInfo(apiKey, teamName, season) {
        const teamId = await getTeamIdByName(apiKey, teamName);
        if (teamId) {
            console.log('Team ID:', teamId); // Log the team ID to ensure it's being retrieved correctly
            await fetchAndDisplayTeamStats(apiKey, teamId, season); // call the renamed function instead of itself
        } else {
            displayNotFoundMessage();
        }
    }
    
    function updateElement(selector, property, value) {
        const element = document.querySelector(selector);
        if (element) {
            element[property] = value;
        }
    }
    
    function updateTeamInfo(team) {
        console.log("updateTeamInfo:", team);
        updateElement('#team-input', 'value', team.name);
        updateElement('#search-button', 'innerText', 'Search');
        updateElement('.team-img img', 'src', team.logo);
        updateElement('.team-facts h2', 'innerText', team.name);
        updateElement('.team-facts p:nth-child(2)', 'innerText', team.founded);
        updateElement('.team-facts p:nth-child(3)', 'innerText', team.country);
    }
    
    function updateVenueInfo(venue) {
        console.log("updateVenueInfo:", venue);
        updateElement('#stadion-city', 'innerText', venue.city);
        updateElement('#stadion-address', 'innerText', venue.address);
        updateElement('#stadion-capacity', 'innerText', venue.capacity);
        updateElement('#stadion-surface', 'innerText', venue.surface);
        updateElement('#stadion-name', 'innerText', venue.name);
        updateElement('#stadion-img', 'src', venue.image);
    }
    
    function updateLeagueInfo(league) {
        console.log("updateLeagueInfo:", league);
        updateElement('#league-name', 'innerText', league.name);
        updateElement('#league-year', 'innerText', league.currentSeason.year);
        updateElement('#league-country', 'innerText', league.country);
    }
    
    function updateStatsInfo(stats) {
        console.log("updateStatsInfo:", stats);
        updateElement('#total-matches', 'innerText', stats.matches.played.total);
        updateElement('#total-goals', 'innerText', stats.goals.total);
        updateElement('#average-goals', 'innerText', (stats.goals.total / stats.matches.played.total).toFixed(2));
        updateElement('#total-wins', 'innerText', stats.totalWins);
        updateElement('#total-draws', 'innerText', stats.totalDraws);
        updateElement('#total-losses', 'innerText', stats.totalLosses);
        updateElement('#clean-sheets', 'innerText', stats.cleanSheets);
        updateElement('#failed-to-score', 'innerText', stats.failedToScore);
        updateElement('#total-home-matches', 'innerText', stats.matches.played.home);
        updateElement('#total-away-matches', 'innerText', stats.matches.played.away);
    }    
    
    function updateHTML(stats, league, team, venue) {
        if (!stats || !league || !team || !venue) return; // return if any of the data is missing
    
        updateTeamInfo(team);
        updateVenueInfo(venue);
        updateLeagueInfo(league);
        updateStatsInfo(stats);
    
        // Reset search button text
        updateElement('#search-button', 'innerText', 'Search');
    }
    

    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const teamName = document.getElementById('team-input').value.trim();
        if (teamName) {
            fetchAndDisplayTeamInfo(apiKey, teamName);
            searchButton.innerText = 'Searching...';
        }
    });

    });

