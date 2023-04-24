
async function countryToTeam(apiKey,country){
    fetch(`https://v3.football.api-sports.io/teams?country=${country}`,{
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": apiKey
      }
    })
      .then(response => {
        console.log(response)
        return response.json();
      })
      .then(data => {
        console.log(`Those are the teams: ${data}`);
        console.log(data)
      })
      .catch(err => {
        console.log(`This is the catch: ${err}`);
      });
  }