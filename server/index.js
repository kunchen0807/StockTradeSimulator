const path = require('path');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const signupAccount = require('../database/controllers/account');
const loginAccount = require('../database/controllers/login');
const API_KEY = require('../config');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

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
    'X-RapidAPI-Key': API_KEY,
  },
};

app.post('/login', (req, res) => {
  loginAccount(req.body, (response) => {
    res.status(201).send(response);
  });
});

app.post('/signup', (req, res) => {
  signupAccount(req.body, () => {
    res.status(201).send('sign success');
  });
});

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
