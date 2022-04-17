import React from 'react';
import ReactDOM from 'react-dom';
import RecipesApp from './RecipesApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecipesApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
