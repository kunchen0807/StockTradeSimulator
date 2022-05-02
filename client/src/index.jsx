// Bring React in to build a component.
import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Login from './components/login';
import SignUp from './components/signup';

const root = createRoot(document.getElementById('root'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      signup: false,
      username: '',
      password: '',
      signupUsername: '',
      signupPassword: '',
    };
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
        } else {
          this.setState({
            authenticated: response.data.authentication,
          });
        }
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

  render() {
    const { authenticated } = this.state;
    const { signup } = this.state;
    if (signup) {
      return (
        <div className="App">
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
        <h1>Hello</h1>
      </div>
    );
  }
}

root.render(<App />);
