const Stocks = require('../models/stockdb');

const userData = (data, cb) => {
  Stocks.find({ username: data.user }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    cb(doc);
  });
};

module.exports = userData;
