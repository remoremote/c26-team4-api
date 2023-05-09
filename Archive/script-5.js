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
    
        updateHTML(stats, league, team, venue); // Update stats, instead of the whole stats object
    
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
    
        const stadium = venue;
        const teamStats = stats;
    
        // Update stadium data
        if (stadium) {
            document.querySelector('.stadion-details #stadion-city').textContent = stadium.city;
            document.querySelector('.stadion-details #stadion-address').textContent = stadium.address;
            document.querySelector('.stadion-details #stadion-capacity').textContent = stadium.capacity;
            document.querySelector('.stadion-details #stadion-surface').textContent = stadium.surface;
            document.querySelector('.stadion-img #stadion-name').textContent = stadium.name;
            document.querySelector('.stadion-img img').src = stadium.image;
        }
    
        // Update league data
        if (league) {
            document.querySelector('.league-info #league-name').textContent = league.name;
            document.querySelector('.league-info #league-year').textContent = league.season;
            document.querySelector('.league-info #league-country').textContent = league.country;
        }
    
        if (teamStats) {
            const statistics = teamStats.response[0];
            // Update match stats
            document.querySelector('#nr-of-matches').textContent = teamStats.fixtures.played.total;
            document.querySelector('#matches-home').textContent = teamStats.fixtures.played.home;
            document.querySelector('#matches-away').textContent = teamStats.fixtures.played.away;
    
            // Update goals
            document.querySelector('.card-goals #nr-of-goals').textContent = teamStats.goals.for.total;
            document.querySelector('.card-goals #goals-home').textContent = teamStats.goals.for.home;
            document.querySelector('.card-goals #goals-away').textContent = teamStats.goals.for.away;
    
            // Update average goals
            document.getElementById('avg-nr-of-goals').textContent = teamStats.goals.for.average.total;
            document.getElementById('avg-goals-home').textContent = teamStats.goals.for.average.home;
            document.getElementById('avg-goals-away').textContent = teamStats.goals.for.average.away;
    
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
                '#nr-of-losses', '#losses-home', '#losses-away',
                '#clean-sheet-home', '#clean-sheet-away', '#clean-sheet-total',
                '#failed-to-score-home', '#failed-to-score-away', '#failed-to-score-total'
            ];
            
            elementsToUpdate.forEach(selector => {
                document.querySelector(selector).textContent = '';
            });
        }
    }

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const teamName = document.getElementById('team-input').value.trim();
        const season = document.getElementById('season-input').value.trim(); // Don't forget to get the season input value
        if (teamName && season) {
            fetchAndDisplayTeamInfo(apiKey, teamName, season);
            searchButton.innerText = 'Searching...';
        }
    });

    // Reset search button text when the input changes
    const teamInput = document.getElementById('team-input');
    teamInput.addEventListener('input', () => {
        searchButton.innerText = 'Search';
    });

    const seasonInput = document.getElementById('season-input');
    seasonInput.addEventListener('input', () => {
        searchButton.innerText = 'Search';
    });

    document.getElementById('search-button').addEventListener('click', () => {
        const teamName = document.getElementById('team-input').value;
        const season = "2022"; // You can change this to a dynamic value if needed
        if (teamName) {
            fetchAndDisplayTeamInfo(apiKey, teamName, season);
        } else {
            alert('Please enter a team name');
        }
    });
});
