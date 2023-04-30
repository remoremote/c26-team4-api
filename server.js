const express = require('express');
const cors = require('cors');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static('public')); 
app.use(cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://v3.football.api-sports.io',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'fa00ed0b5emsh0cfc2bed1d96245p19e0d1jsna00df65a08d3',
    },
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
