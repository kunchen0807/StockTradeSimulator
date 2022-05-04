const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stockTrader');

const stockDataSchema = mongoose.Schema({
  username: String,
  buyingPower: Number,
  investment: Number,
  stock: Array,
});

const Stocks = mongoose.model('stocks', stockDataSchema);

module.exports = Stocks;
