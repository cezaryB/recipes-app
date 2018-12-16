import React from 'react';
import Recipe from './Recipe';
import { RecipesContextConsumer } from '../helpers/RecipesContext';

const RecipesList = () => {
  return (
    <RecipesContextConsumer>
      {({ data: { recipesList }}) => {
        return (
          <div className='app__recipes-container'>
            {recipesList.map((recipe) => {
              return <Recipe recipe={recipe} key={recipe.id}/>
            })}
          </div>
        );
      }}
    </RecipesContextConsumer>
  );
};

export default RecipesList;