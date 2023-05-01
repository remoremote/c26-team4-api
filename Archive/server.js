const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

const apiUrl = 'https://v3.football.api-sports.io';
const apiKey = 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3';

app.use(express.json());

app.all('/api/*', async (req, res) => {
  const fetch = await import('node-fetch').then(module => module.default);
  
  const url = `${apiUrl}${req.path}`;
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': apiKey
  };

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: headers,
      agent: new https.Agent({ rejectUnauthorized: false })
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
