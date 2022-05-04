// Bring React in to build a component.
import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Login from './components/login';
import SignUp from './components/signup';
import StockOverivew from './components/stockOverview';
import StockNews from './components/stockNews';
import Search from './components/search';
import AccountOverview from './components/accountOverview';
import Stockstats from './components/stockStats';
import {
  stockData, trendingStocks, stockNews, stockStats,
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
      // stockData: stockData,
      // stockNews: stockNews,
      // trendingStocks: trendingStocks,
      searchValue: 'AMZN',
      currentStock: 'AMZN',
      currentPrice: 5,
      quantity: 0,
      buyingPower: 0,
      investValue: 0,
      stockOwned: [],
    };
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
    axios.post('/login', { login_username: username, login_password: password })
      .then((response) => {
        if (!response.data.authentication) {
          alert('Invid username or password');
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
    axios.post('/signup', { signup_username: signupUsername, signup_password: signupPassword })
      .then(() => {
        this.setState({
          signup: false,
          signupUsername: '',
          signupPassword: '',
        });
      });
  }

  signupPage() {
    this.setState({
      signup: true,
    });
  }

  searchStock(input) {
    this.setState({
      searchValue: input,
    });
  }

  submitSearch() {
    const { searchValue } = this.state;
    this.setState({
      currentStock: searchValue,
    });
    console.log({ stock: searchValue, interval: '15min', output: '30' });
  }

  todayView() {
    const { currentStock } = this.state;
    console.log({ stock: currentStock, interval: '15min', output: '30' });
  }

  monthlyView() {
    const { currentStock } = this.state;
    console.log({ stock: currentStock, interval: '1day', output: '30' });
  }

  yearlyView() {
    const { currentStock } = this.state;
    console.log({ stock: currentStock, interval: '1week', output: '52' });
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
    const stockInfo = {
      username: currentUser,
      cash: buyingPower,
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
        this.setState({
          quantity: 0,
        });
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
    const stockInfo = {
      username: currentUser,
      cash: buyingPower,
      stock: {
        symbol: currentStock,
        stockQuantity: quantity,
        mostRecentPrice: currentPrice,
        avgPurchasePrice: currentPrice,
      },
    };
    axios.post('/sell', stockInfo)
      .then((results) => console.log(results))
      .catch((error) => {
        console.error('fail to sell', error);
        this.fetchUserData();
        this.setState({
          quantity: 0,
        });
        alert('Please check you have enough stocks to sell');
      });
  }

  render() {
    const { authenticated } = this.state;
    const { signup } = this.state;
    const { currentUser } = this.state;
    const { buyingPower } = this.state;
    const { investValue } = this.state;
    const { stockOwned } = this.state;
    // const { stockData } = this.state;
    // const { stockNews } = this.state;
    // const { trendingStocks } = this.state;

    if (signup) {
      return (
        <div className="App">
          <h1>RobinWoo!</h1>
          <SignUp
            usernameSignup={(input) => this.usernameSignup(input)}
            passwordSignup={(input) => this.passwordSignup(input)}
            signupSubmit={() => this.signupSubmit()}
          />
        </div>
      );
    }
    if (!authenticated && !signup) {
      return (
        <div className="App">
          <h1>RobinWoo!</h1>
          <Login
            usernameInput={(input) => this.usernameInput(input)}
            passwordInput={(input) => this.passwordInput(input)}
            loginSubmit={() => this.loginSubmit()}
            signupPage={() => this.signupPage()}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <h1>RobinWoo!</h1>
        <StockNews stockNews={stockNews} trendingStocks={trendingStocks} />
        <Search
          searchStock={(input) => this.searchStock(input)}
          submitSearch={() => this.submitSearch()}
        />
        <StockOverivew
          stockData={stockData}
          todayView={() => this.todayView()}
          monthlyView={() => this.monthlyView()}
          yearlyView={() => this.yearlyView()}
        />
        <AccountOverview
          currentUser={currentUser}
          stockQuantityEnter={(input) => this.stockQuantityEnter(input)}
          buyStock={() => this.buyStock()}
          sellStock={() => this.sellStock()}
          buyingPower={buyingPower}
          investValue={investValue}
          stockOwned={stockOwned}
        />
        <Stockstats
          stockStats={stockStats}
        />
      </div>
    );
  }
}

root.render(<App />);
