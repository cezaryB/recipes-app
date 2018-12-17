import React from 'react';

const Loader = () => {
  return (
    <div className="loader">
      <h3 className="loader__text">
        Your data will be here shortly
      </h3>
      <div className="loader__bounce"></div>
      <div className="loader__bounce"></div>
      <div className="loader__bounce"></div>
    </div>
  );
};

export default Loader;