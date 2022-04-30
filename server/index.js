const path = require('path');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {
    interval: '5min',
    function: 'TIME_SERIES_INTRADAY',
    symbol: 'MSFT',
    datatype: 'json',
    output_size: 'compact',
  },
  headers: {
    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
    'X-RapidAPI-Key': '4b5804719fmsh5141634c5952b39p1cb17cjsnf9ee9ac7d74f',
  },
};

app.get('/stock', (req, res) => {
  axios.request(options).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.error(error);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});
