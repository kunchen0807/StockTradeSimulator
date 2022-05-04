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
      <p>
        User: @
        {currentUser}
      </p>
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
      <div className="stock_owned">
        <p>Stocks</p>
        {stockOwned.map((stock) => (
          <p key={stock.symbol}>
            Stock Symbol:
            {' '}
            {stock.symbol}
            {' '}
            Shares:
            {' '}
            {stock.stockQuantity}
            {' '}
            Average Cost:
            {' $'}
            {stock.avgPurchasePrice}
          </p>
        ))}
      </div>
    </div>
  );
}

AccountOverview.propTypes = {
};

AccountOverview.defaultProps = {
};

export default AccountOverview;
