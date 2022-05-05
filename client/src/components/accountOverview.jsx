import React from 'react';
import PropTypes from 'prop-types';

function AccountOverview({
  currentUser, stockQuantityEnter, buyStock, sellStock,
  buyingPower, investValue, stockOwned,
}) {
  const dollarUSLocale = Intl.NumberFormat('en-US');
  let totalStockValue = 0;
  for (let i = 0; i < stockOwned.length; i += 1) {
    totalStockValue += stockOwned[i].stockQuantity * stockOwned[i].mostRecentPrice;
  }
  const totalAsset = buyingPower + totalStockValue;
  const profit = ((totalAsset - investValue) / investValue) * 100;
  return (
    <div className="account overview">
      <h3>
        User: @
        {currentUser}
      </h3>
      <p>Number of Shares</p>
      <input type="number" min="1" placeholder="Please Enter a Number" onChange={(input) => stockQuantityEnter(input.target.value)} />
      <button type="submit" onClick={() => buyStock()}>Buy</button>
      <button type="submit" onClick={() => sellStock()}>Sell</button>
      <p>
        Buying Power:
        {' $'}
        {dollarUSLocale.format(buyingPower)}
      </p>
      <p>
        Investment value:
        {' $'}
        {dollarUSLocale.format(investValue)}
      </p>
      <p>
        Total Asset:
        {' '}
        {dollarUSLocale.format(totalAsset)}
      </p>
      <p>
        Total Profit:
        {' '}
        {profit}
        %
      </p>
      <h3>My Stocks</h3>
      <div className="stock_owned">
        {stockOwned.map((stock) => (
          <p key={stock.symbol}>
            Stock:
            {' '}
            {stock.symbol}
            {' -- '}
            Shares:
            {' '}
            {stock.stockQuantity}
            {' -- '}
            Average Cost:
            {' $'}
            {dollarUSLocale.format(stock.avgPurchasePrice)}
          </p>
        ))}
      </div>
    </div>
  );
}

AccountOverview.propTypes = {
  currentUser: PropTypes.string,
  stockQuantityEnter: PropTypes.func,
  buyStock: PropTypes.func,
  sellStock: PropTypes.func,
  buyingPower: PropTypes.number,
  investValue: PropTypes.number,
  stockOwned: PropTypes.shape([]),
};

AccountOverview.defaultProps = {
  currentUser: '',
  stockQuantityEnter: () => {},
  buyStock: () => {},
  sellStock: () => {},
  buyingPower: 0,
  investValue: 0,
  stockOwned: [],
};

export default AccountOverview;
