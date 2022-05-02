const StockAccount = require('../models/stockdb');

const loginAccount = (data, cb) => {
  const loginQuery = { username: data.login_username, password: data.login_password };
  StockAccount.find(loginQuery, (err, results) => {
    if (err) {
      console.log('fail to find account data', err);
    }
    if (results.length === 0) {
      cb({ authentication: false });
    } else {
      cb({ authentication: true });
    }
  });
};

module.exports = loginAccount;
