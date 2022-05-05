const Stocks = require('../models/stockdb');

const investmentPurchase = (data, cb) => {
  Stocks.findOneAndUpdate(
    { username: data.username },
    { buyingPower: data.buyingPower, investment: data.investment },
    (err) => {
      if (err) {
        console.log('fail to purchase', err);
      }
      cb();
    },
  );
};

module.exports = investmentPurchase;
