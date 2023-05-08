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
        const {
            team: {
                team,
                venue
            }
        } = teamData.response[0];
    
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
    
    function updateHTML(stats, league, team, venue) {
        if (!stats || !league || !team || !venue) return; // return if any of the data is missing
    
        // Update team information
        document.getElementById('team-input').value = team.name;
        document.getElementById('search-button').innerText = 'Search';
    
        // Update team details
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
        document.getElementById('stadion-img').src = venue.image;
    
        // Update league information
        document.getElementById('league-name').innerText = league.name;
        document.getElementById('league-year').innerText = league.currentSeason.year;
        document.getElementById('league-country').innerText = league.country;
    
        // Update match statistics
        document.getElementById('nr-of-matches').innerText = stats.fixtures.played.total;
        document.getElementById('matches-home').innerText = stats.fixtures.played.home;
        document.getElementById('matches-away').innerText = stats.fixtures.played.away;
    
        // Update goal statistics
        document.getElementById('nr-of-goals').innerText = stats.goals.for.total;
        document.getElementById('goals-home').innerText = stats.goals.for.home;
        document.getElementById('goals-away').innerText = stats.goals.for.away;
    
        // Update average goal statistics
        document.getElementById('avg-nr-of-goals').innerText = stats.goals.for.average.total;
        document.getElementById('avg-goals-home').innerText = stats.goals.for.average.home;
        document.getElementById('avg-goals-away').innerText = stats.goals.for.average.away;
    
        // Update win statistics
        document.getElementById('nr-of-wins').innerText = stats.wins.total;
        document.getElementById('wins-home').innerText = stats.wins.home;
        document.getElementById('wins-away').innerText = stats.wins.away;
    
        // Update draw statistics
        document.getElementById('nr-of-draws').innerText = stats.draws.total;
        document.getElementById('draws-home').innerText = stats.draws.home;
        document.getElementById('draws-away').innerText = stats.draws.away;
    
        // Update loss statistics
        document.getElementById('nr-of-losses').innerText = stats.loses.total;
        document.getElementById('losses-home').innerText = stats.loses.home;
        document.getElementById('losses-away').innerText = stats.loses.away;
    
        // Update clean sheet statistics
        document.getElementById('clean-sheet-home').innerText = stats.clean_sheet.home;
        document.getElementById('clean-sheet-away').innerText = stats.clean_sheet.away;
        document.getElementById('clean-sheet-total').innerText = stats.clean_sheet.total;
    
        // Update failed to score statistics
        document.getElementById('failed-to-score-home').innerText = stats[0].failed_to_score.home;
        document.getElementById('failed-to-score-away').innerText = stats[0].failed_to_score.away;
        document.getElementById('failed-to-score-total').innerText = stats[0].failed_to_score.total;

        // Update draw statistics
        document.getElementById('nr-of-draws').innerText = stats[0].league.draws.total;
        document.getElementById('draws-home').innerText = stats[0].league.draws.home;
        document.getElementById('draws-away').innerText = stats[0].league.draws.away;
    }

    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const teamName = document.getElementById('team-input').value.trim();
        if (teamName) {
            fetchAndDisplayTeamInfo(apiKey, teamName, '2021');
            searchButton.innerText = 'Searching...';
        }
    });

    });

