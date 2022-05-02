const StockAccount = require('../models/stockdb');

const signupAccount = (data, cb) => {
  const signupQuery = { username: data.signup_username, password: data.signup_password };
  StockAccount.create(signupQuery)
    .then(() => cb())
    .catch((err) => console.log(err));
};

module.exports = signupAccount;
