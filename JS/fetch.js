

async function fetcher(apiKey){
  fetch(`https://v3.football.api-sports.io/countries`,{
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": apiKey
    }
  })
    .then(response => {
      console.log(`This is the response: ${response}`)
      return response.json();
    })
    .then(data => {
      console.log(`This is then data: ${data}`);
      console.log(data)
    })
    .catch(err => {
      console.log(`This is the catch: ${err}`);
    });
}

export { fetcher };
