const Stocks = require('../models/stockdb');

const initializeAccount = (data, cb) => {
  const initializeQuery = {
    username: data.signup_username, buyingPower: '10000', investment: '10000', stock: [],
  };
  Stocks.create(initializeQuery)
    .then(() => cb())
    .catch((err) => console.log(err));
};

module.exports = initializeAccount;
