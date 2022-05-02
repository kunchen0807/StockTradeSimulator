const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/stockTrader');

const accountSchema = mongoose.Schema({
  username: String,
  password: String,
});

const StockAccount = mongoose.model('account', accountSchema);

module.exports = StockAccount;
