import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import swal from 'sweetalert';
import './stockTrader.scss';

export default class InGamePurchase extends Component {
  constructor(props) {
    super(props);
    const { toggle } = this.props;
    const { fetchUserData } = this.props;
    this.state = {
      togglePop: toggle,
      fetchData: fetchUserData,
    };
  }

  handleClick() {
    const { togglePop } = this.state;
    togglePop();
  }

  purchaseOptionOne() {
    const { buyingPower } = this.props;
    const { investValue } = this.props;
    const { user } = this.props;
    const { fetchData } = this.state;
    const purchase = {
      username: user,
      investment: investValue + 10000,
      buyingPower: buyingPower + 10000,
    };
    axios.post('/purchase', purchase)
      .then(() => {
        fetchData();
        swal('Thank you!', 'Your purchase is successful!', 'success');
      });
  }

  purchaseOptionTwo() {
    const { buyingPower } = this.props;
    const { investValue } = this.props;
    const { user } = this.props;
    const { fetchData } = this.state;
    const purchase = {
      username: user,
      investment: investValue + 150000,
      buyingPower: buyingPower + 150000,
    };
    axios.post('/purchase', purchase)
      .then(() => {
        fetchData();
        swal('Thank you!', 'Your purchase is successful!', 'success');
      });
  }

  purchaseOptionThree() {
    const { buyingPower } = this.props;
    const { investValue } = this.props;
    const { user } = this.props;
    const { fetchData } = this.state;
    const purchase = {
      username: user,
      investment: investValue + 2000000,
      buyingPower: buyingPower + 2000000,
    };
    axios.post('/purchase', purchase)
      .then(() => {
        fetchData();
        swal('Thank you!', 'Your purchase is successful!', 'success');
      });
  }

  render() {
    return (
      <div className="purchase-modal">
        <span className="close" onClick={() => this.handleClick()} aria-hidden="true">&times;</span>
        <h3 className="purchase-title">Buy More Beans!</h3>
        <img src="https://t3.ftcdn.net/jpg/02/82/38/88/360_F_282388895_saHV8swgRXJYN3hGFCVBstLEWUKWzWSi.jpg" alt="Bean" width="100" height="100" className="bean-pic" />
        <button type="submit" className="purchase-button" onClick={() => this.purchaseOptionOne()}>$1 for $10,000 Beans</button>
        <button type="submit" className="purchase-button" onClick={() => this.purchaseOptionTwo()}>$10 for $150,000 Beans</button>
        <button type="submit" className="purchase-button" onClick={() => this.purchaseOptionThree()}>$100 for $2,000,000 Beans</button>
      </div>
    );
  }
}

InGamePurchase.propTypes = {
  toggle: PropTypes.func,
  fetchUserData: PropTypes.func,
  buyingPower: PropTypes.number,
  investValue: PropTypes.number,
  user: PropTypes.string,
};

InGamePurchase.defaultProps = {
  toggle: () => {},
  fetchUserData: () => {},
  buyingPower: 0,
  investValue: 0,
  user: '',
};
