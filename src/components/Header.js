import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <header className='app__header'>
      <Logo />
      <h1 className='app__header-title'>
        Reciply
      </h1>
    </header>
  )
};

export default Header;