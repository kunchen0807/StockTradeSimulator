const path = require('path');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const signupAccount = require('../database/controllers/account');
const loginAccount = require('../database/controllers/login');
const initializeAccount = require('../database/controllers/initializeAccount');
const buyStocks = require('../database/controllers/buyStocks');
const sellStocks = require('../database/controllers/sellStocks');
const userData = require('../database/controllers/userData');
const investmentPurchase = require('../database/controllers/investmentPurchase');
const config = require('../config');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

const options = (stockSymbol, timeInterval, output) => ({
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/time_series',
  params: {
    symbol: stockSymbol, interval: timeInterval, outputsize: output, format: 'json',
  },
  headers: {
    'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com',
    'X-RapidAPI-Key': config.API_KEY,
  },
});

const trendingStocks = {
  method: 'GET',
  url: 'https://stock-data-yahoo-finance-alternative.p.rapidapi.com/v1/finance/trending/US',
  headers: {
    'X-RapidAPI-Host': 'stock-data-yahoo-finance-alternative.p.rapidapi.com',
    'X-RapidAPI-Key': config.API_KEY,
  },
};

const stockNews = {
  method: 'GET',
  url: 'https://mboum-finance.p.rapidapi.com/ne/news',
  headers: {
    'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
    'X-RapidAPI-Key': config.API_KEY,
  },
};

const stats = (stockSymbol, timeInterval, output) => ({
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/quote',
  params: {
    symbol: stockSymbol, interval: timeInterval, outputsize: output, format: 'json',
  },
  headers: {
    'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com',
    'X-RapidAPI-Key': config.API_KEY,
  },
});

app.post('/login', (req, res) => {
  loginAccount(req.body, (response) => {
    res.status(201).send(response);
  });
});

app.post('/signup', (req, res) => {
  signupAccount(req.body, () => {
    initializeAccount(req.body, () => {
      res.status(201).send('sign success');
    });
  });
});

app.post('/stock', (req, res) => {
  axios.request(options(req.body.stock, req.body.interval, req.body.output)).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.error(error);
  });
});

app.post('/stats', (req, res) => {
  axios.request(stats(req.body.stock, req.body.interval, req.body.output)).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    console.error(error);
  });
});

app.get('/trend', (req, res) => {
  axios.request(trendingStocks).then((response) => {
    res.json(response.data.finance.result[0].quotes);
  }).catch((error) => {
    console.error(error);
  });
});

app.get('/news', (req, res) => {
  axios.request(stockNews).then((response) => {
    res.json(response.data.slice(0, 5));
  }).catch((error) => {
    console.error(error);
  });
});

app.post('/user', (req, res) => {
  userData(req.body, (results) => res.status(200).send(results));
});

app.post('/buy', (req, res) => {
  buyStocks(req.body, () => res.status(200).send('buying completed'));
});

app.post('/sell', (req, res) => {
  sellStocks(req.body, () => res.status(200).send('selling completed'), () => res.status(500).send('selling failed'));
});

app.post('/purchase', (req, res) => {
  investmentPurchase(req.body, () => res.status(200).send('purchase completed'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});
