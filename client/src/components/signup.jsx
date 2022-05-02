import React from 'react';
import PropTypes from 'prop-types';

function SignUp({ usernameSignup, passwordSignup, signupSubmit }) {
  return (
    <div className="signup">
      <span>
        <h2>Account Sign Up</h2>
        <input type="text" placeholder="USERNAME" onChange={(input) => usernameSignup(input.target.value)} />
        <input type="password" placeholder="PASSWORD" onChange={(input) => passwordSignup(input.target.value)} />
        <button type="submit" onClick={() => signupSubmit()}>Submit</button>
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
