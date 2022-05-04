const Stocks = require('../models/stockdb');

const buyStocks = (data, cb) => {
  console.log('buy', data);
  Stocks.find({ username: data.username }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    const updateStock = doc[0].stock;
    let exist = false;
    for (let i = 0; i < updateStock.length; i += 1) {
      if (updateStock[i].symbol === data.stock.symbol) {
        updateStock[i].avgPurchasePrice = ((updateStock[i].avgPurchasePrice
          * updateStock[i].stockQuantity)
          + (data.stock.avgPurchasePrice * data.stock.stockQuantity))
          / (updateStock[i].stockQuantity + data.stock.stockQuantity);
        updateStock[i].stockQuantity += data.stock.stockQuantity;
        updateStock[i].mostRecentPrice = data.stock.mostRecentPrice;
        exist = true;
      }
    }
    if (!exist) {
      updateStock.push(data.stock);
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

module.exports = buyStocks;
