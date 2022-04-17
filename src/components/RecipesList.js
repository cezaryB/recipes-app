import React from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';

const RecipesList = ({ recipesList }) => {
  return (
    <div className='app__recipes-container'>
      {recipesList.map((recipe) => {
        return <Recipe recipe={recipe} key={recipe.id}/>
      })}
    </div>
  );
};

RecipesList.propTypes = {
  recipesList: PropTypes.array.isRequired
};

export default RecipesList;