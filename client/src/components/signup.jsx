import React from 'react';
import PropTypes from 'prop-types';

function SignUp({ usernameSignup, passwordSignup, signupSubmit }) {
  return (
    <div className="signup">
      <span>
        <h2 className="signin-title">Account Sign Up</h2>
        <div className="sign-in-username">
          <input type="text" placeholder="USERNAME" onChange={(input) => usernameSignup(input.target.value)} />
        </div>
        <div className="sign-in-password">
          <input type="password" placeholder="PASSWORD" onChange={(input) => passwordSignup(input.target.value)} />
        </div>
        <div className="sign-up-button">
          <button type="submit" onClick={() => signupSubmit()}>Submit</button>
        </div>
      </span>
    </div>
  );
}

SignUp.propTypes = {
  usernameSignup: PropTypes.func,
  passwordSignup: PropTypes.func,
  signupSubmit: PropTypes.func,
};

SignUp.defaultProps = {
  usernameSignup: () => {},
  passwordSignup: () => {},
  signupSubmit: () => {},
};

export default SignUp;
