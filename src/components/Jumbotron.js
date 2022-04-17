import React from 'react';
import PropTypes from 'prop-types';

const Jumbotron = (props) => {
  return (
    <div className='app__jumbotron'>
      <div className='container'>
        <h2 className='app__jumbotron-title'>
          {props.callToAction}
        </h2>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  callToAction: PropTypes.string.isRequired,
};

export default Jumbotron;