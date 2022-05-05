// Bring React in to build a component.
import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import swal from 'sweetalert';
import { hashString } from 'react-hash-string';
import Login from './components/login';
import SignUp from './components/signup';
import StockOverivew from './components/stockOverview';
import StockNews from './components/stockNews';
import Search from './components/search';
import AccountOverview from './components/accountOverview';
import Stockstats from './components/stockStats';
import InGamePurchase from './components/inGamePurchase';
import {
  stockdata, trendingstocks, stockstats, stocknews,
} from './exampleData';

const root = createRoot(document.getElementById('root'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      signup: false,
      username: '',
      password: '',
      currentUser: '',
      signupUsername: '',
      signupPassword: '',
      stockData: stockdata,
      stockNews: stocknews,
      trendingStocks: trendingstocks,
      searchValue: 'AMZN',
      currentStock: 'AMZN',
      currentPrice: 5,
      quantity: 0,
      buyingPower: 0,
      investValue: 0,
      stockOwned: [],
      seen: false,
      stockStats: stockstats,
    };
  }

  componentDidMount() {
    this.fetchNews();
    this.fetchTrendingStocks();
    this.submitSearch();
  }

  // fetch user data once authentication is done

  componentDidUpdate(prevProps, prevState) {
    const { authenticated } = this.state;
    if (prevState.authenticated !== authenticated) {
      this.fetchUserData();
    }
  }

  // interaction methods

  usernameInput(input) {
    this.setState({
      username: input,
    });
  }

  passwordInput(input) {
    this.setState({
      password: input,
    });
  }

  loginSubmit() {
    const { username } = this.state;
    const { password } = this.state;
    axios.post('/login', { login_username: username, login_password: hashString(password) })
      .then((response) => {
        if (!response.data.authentication) {
          swal('Invid username or password!', 'Please retry!', 'error');
          this.setState({
            username: '',
            password: '',
          });
        } else {
          this.setState({
            authenticated: response.data.authentication,
            currentUser: username,
            password: '',
          });
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  usernameSignup(input) {
    this.setState({
      signupUsername: input,
    });
  }

  passwordSignup(input) {
    this.setState({
      signupPassword: input,
    });
  }

  signupSubmit() {
    const { signupUsername } = this.state;
    const { signupPassword } = this.state;
    axios.post('/signup', { signup_username: signupUsername, signup_password: hashString(signupPassword) })
      .then(() => {
        this.setState({
          signup: false,
          signupUsername: '',
          signupPassword: '',
        });
        swal('Login now', 'Your account is created!', 'success');
      });
  }

  signupPage() {
    this.setState({
      signup: true,
    });
  }

  signOut() {
    this.setState({
      authenticated: false,
      username: '',
      password: '',
    });
  }

  togglePop() {
    const { seen } = this.state;
    this.setState({
      seen: !seen,
    });
  }

  searchStock(input) {
    this.setState({
      searchValue: input,
    });
  }

  submitSearch() {
    const { searchValue } = this.state;
    this.setState(
      { currentStock: searchValue.toUpperCase() },
      () => {
        this.fetchStats();
      },
    );
    axios.post('/stock', { stock: searchValue, interval: '15min', output: '30' })
      .then((results) => {
        this.setState({
          stockData: results.data,
          currentPrice: results.data.values[0].close,
        });
      });
  }

  todayView() {
    const { currentStock } = this.state;
    axios.post('/stock', { stock: currentStock, interval: '15min', output: '30' })
      .then((results) => {
        this.setState({
          stockData: results.data,
        });
      });
  }

  monthlyView() {
    const { currentStock } = this.state;
    axios.post('/stock', { stock: currentStock, interval: '1day', output: '30' })
      .then((results) => {
        this.setState({
          stockData: results.data,
        });
      });
  }

  yearlyView() {
    const { currentStock } = this.state;
    axios.post('/stock', { stock: currentStock, interval: '1week', output: '52' })
      .then((results) => {
        this.setState({
          stockData: results.data,
        });
      });
  }

  fetchStats() {
    const { currentStock } = this.state;
    axios.post('/stats', { stock: currentStock, interval: '15min', output: '30' })
      .then((results) => {
        this.setState({
          stockStats: results.data,
        });
      });
  }

  fetchNews() {
    axios.get('/news')
      .then((results) => {
        this.setState({
          stockNews: results.data,
        });
      });
  }

  fetchTrendingStocks() {
    axios.get('/trend')
      .then((results) => {
        this.setState({
          trendingStocks: results.data,
        });
      });
  }

  fetchUserData() {
    const { currentUser } = this.state;
    axios.post('/user', { user: currentUser })
      .then((results) => {
        this.setState({
          buyingPower: results.data[0].buyingPower,
          investValue: results.data[0].investment,
          stockOwned: results.data[0].stock,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  stockQuantityEnter(input) {
    this.setState({
      quantity: parseInt(input, 10),
    });
  }

  buyStock() {
    const { currentStock } = this.state;
    const { buyingPower } = this.state;
    const { quantity } = this.state;
    const { currentUser } = this.state;
    const { currentPrice } = this.state;
    const calculatedBuyingPower = buyingPower - (quantity * currentPrice);
    const stockInfo = {
      username: currentUser,
      cash: calculatedBuyingPower,
      stock: {
        symbol: currentStock,
        stockQuantity: quantity,
        mostRecentPrice: currentPrice,
        avgPurchasePrice: currentPrice,
      },
    };
    axios.post('/buy', stockInfo)
      .then(() => {
        this.fetchUserData();
        swal('Thank you!', 'You order has been processed!', 'success');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sellStock() {
    const { currentStock } = this.state;
    const { buyingPower } = this.state;
    const { quantity } = this.state;
    const { currentUser } = this.state;
    const { currentPrice } = this.state;
    const calculatedBuyingPower = buyingPower + (quantity * currentPrice);
    const stockInfo = {
      username: currentUser,
      cash: calculatedBuyingPower,
      stock: {
        symbol: currentStock,
        stockQuantity: quantity,
        mostRecentPrice: currentPrice,
      },
    };
    axios.post('/sell', stockInfo)
      .then(() => {
        this.fetchUserData();
        swal('Thank you!', 'You order has been processed!', 'success');
      })
      .catch((error) => {
        console.error(error);
        this.fetchUserData();
        swal('Transaction unsuccessful!', 'Please check if you have enough stocks to sell', 'error');
      });
  }

  render() {
    const { authenticated } = this.state;
    const { signup } = this.state;
    const { currentUser } = this.state;
    const { buyingPower } = this.state;
    const { investValue } = this.state;
    const { stockOwned } = this.state;
    const { seen } = this.state;
    const { quantity } = this.state;
    const { stockData } = this.state;
    const { currentPrice } = this.state;
    const { stockNews } = this.state;
    const { trendingStocks } = this.state;
    const { stockStats } = this.state;

    if (signup) {
      return (
        <div className="App">
          <h1 className="app-title">Robeanhood</h1>
          <SignUp
            usernameSignup={(input) => this.usernameSignup(input)}
            passwordSignup={(input) => this.passwordSignup(input)}
            signupSubmit={() => this.signupSubmit()}
          />
        </div>
      );
    }
    if (!authenticated && !signup) {
      const { username } = this.state;
      const { password } = this.state;
      return (
        <div className="App">
          <h1 className="app-title">Robeanhood</h1>
          <Login
            usernameInput={(input) => this.usernameInput(input)}
            passwordInput={(input) => this.passwordInput(input)}
            loginSubmit={() => this.loginSubmit()}
            signupPage={() => this.signupPage()}
            username={username}
            password={password}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <h1 className="app-title">Robeanhood</h1>
        <button className="sign-out-button" type="submit" onClick={() => this.signOut()}>Sign Out</button>
        <div>
          <button className="in-game-purchase-button" type="button" onClick={() => this.togglePop()}>Purchase</button>
        </div>
        <div>
          {seen ? (
            <InGamePurchase
              toggle={() => this.togglePop()}
              user={currentUser}
              buyingPower={buyingPower}
              investValue={investValue}
              fetchUserData={() => this.fetchUserData()}
            />
          ) : null}
        </div>
        <div className="stock-news-section">
          <StockNews stockNews={stockNews} trendingStocks={trendingStocks} />
        </div>
        <div className="search-stock-overview-section">
          <Search
            searchStock={(input) => this.searchStock(input)}
            submitSearch={() => this.submitSearch()}
          />
          <StockOverivew
            stockData={stockData}
            todayView={() => this.todayView()}
            monthlyView={() => this.monthlyView()}
            yearlyView={() => this.yearlyView()}
            currentPrice={currentPrice}
          />
        </div>
        <div className="account-overview-section">
          <AccountOverview
            currentUser={currentUser}
            stockQuantityEnter={(input) => this.stockQuantityEnter(input)}
            buyStock={() => this.buyStock()}
            sellStock={() => this.sellStock()}
            buyingPower={buyingPower}
            investValue={investValue}
            stockOwned={stockOwned}
            quantity={quantity}
          />
        </div>
        <div className="stock-stats-section">
          <Stockstats
            stockStats={stockStats}
          />
        </div>
      </div>
    );
  }
}

root.render(<App />);
