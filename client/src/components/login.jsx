import React from 'react';
import PropTypes from 'prop-types';

function Login({
  usernameInput, passwordInput, loginSubmit, signupPage, username, password,
}) {
  return (
    <div className="login">
      <span>
        <h2 className="signin-title">Account Sign In</h2>
        <div className="sign-in-username">
          <input type="text" placeholder="USERNAME" value={username} onChange={(input) => usernameInput(input.target.value)} />
        </div>
        <div className="sign-in-password">
          <input type="password" placeholder="PASSWORD" value={password} onChange={(input) => passwordInput(input.target.value)} />
        </div>
        <div className="sign-in-button">
          <button type="submit" onClick={() => loginSubmit()}>Submit</button>
          <button type="submit" onClick={() => signupPage()}>Sign Up</button>
        </div>
      </span>
    </div>
  );
}

Login.propTypes = {
  usernameInput: PropTypes.func,
  passwordInput: PropTypes.func,
  loginSubmit: PropTypes.func,
  signupPage: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
};

Login.defaultProps = {
  usernameInput: () => {},
  passwordInput: () => {},
  loginSubmit: () => {},
  signupPage: () => {},
  username: '',
  password: '',
};

export default Login;
