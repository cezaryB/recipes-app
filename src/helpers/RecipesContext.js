import React, { createContext } from 'react';

export const RecipesContext = createContext();

export const RecipesContextConsumer = (props) => {
  return (
    <RecipesContext.Consumer>
      {context => {
        if (!context) throw new Error('you have to provide value for the context!');
        return props.children(context);
      }}
    </RecipesContext.Consumer>
  );
};
