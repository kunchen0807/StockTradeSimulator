import React from 'react';
import PropTypes from 'prop-types';

function Login({
  usernameInput, passwordInput, loginSubmit, signupPage,
}) {
  return (
    <div className="login">
      <span>
        <h2>Account Sign In</h2>
        <input type="text" placeholder="USERNAME" onChange={(input) => usernameInput(input.target.value)} />
        <input type="password" placeholder="PASSWORD" onChange={(input) => passwordInput(input.target.value)} />
        <button type="submit" onClick={() => loginSubmit()}>Submit</button>
        <button type="submit" onClick={() => signupPage()}>Sign Up</button>
      </span>
    </div>
  );
}

Login.propTypes = {
  usernameInput: PropTypes.func,
  passwordInput: PropTypes.func,
  loginSubmit: PropTypes.func,
  signupPage: PropTypes.func,
};

Login.defaultProps = {
  usernameInput: () => {},
  passwordInput: () => {},
  loginSubmit: () => {},
  signupPage: () => {},
};

export default Login;
