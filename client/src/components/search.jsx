import React from 'react';
import PropTypes from 'prop-types';

function Search({ searchStock, submitSearch, }) {
  return (
    <div className="search">
      <span>
        <h2>Search</h2>
        <input type="text" placeholder="STOCK SYMBOL" onChange={(input) => searchStock(input.target.value)} />
        <button type="submit" onClick={() => submitSearch()}>Submit</button>
      </span>
    </div>
  );
}

Search.propTypes = {
};

Search.defaultProps = {
};

export default Search;
