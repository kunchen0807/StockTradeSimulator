const Stocks = require('../models/stockdb');

const sellStocks = (data, cb, failCb) => {
  Stocks.find({ username: data.username }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    const updateStock = doc[0].stock;
    let exist = false;
    for (let i = 0; i < updateStock.length; i += 1) {
      if (updateStock[i].symbol === data.stock.symbol) {
        if (updateStock[i].stockQuantity >= data.stock.stockQuantity) {
          updateStock[i].stockQuantity -= data.stock.stockQuantity;
          updateStock[i].mostRecentPrice = data.stock.mostRecentPrice;
        } else {
          failCb();
          return;
        }
        exist = true;
      }
    }
    if (!exist) {
      failCb();
      return;
    }
    const updateData = { buyingPower: data.cash, stock: updateStock };
    Stocks.findOneAndUpdate({ username: data.username }, updateData, (error) => {
      if (error) {
        console.log(err);
      }
      cb();
    });
  });
};

module.exports = sellStocks;
