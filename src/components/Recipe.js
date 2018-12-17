import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RecipesContextConsumer } from "../helpers/RecipesContext";

class Recipe extends Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
    }
  }

  static renderIngredients(listOfIngredients) {
    let uniqueKey = '';
    return (
      <ul className='app__recipe-ingredients'>
        {listOfIngredients.map((ingredient, index) => {
          uniqueKey = index.toString().concat(ingredient);
          return (
            <li className='app__recipe-ingredient' key={uniqueKey}>
              {ingredient}
            </li>
          );
        })}
      </ul>
    )
  }

  renderRecipeControls(recipeID) {
    return (
      <RecipesContextConsumer>
        {({ actions: { toggleModal, deleteRecipe }}) => {
          return (
            <div className='app__recipe-controls'>
              <button
                className='app__recipe-control button button--tertiary'
                onClick={() => toggleModal(recipeID)}
                ref={editRecipeButton => this.editRecipeButton = editRecipeButton}
              >
                Edit
              </button>
              <button
                className='app__recipe-control button button--secondary'
                onClick={() => deleteRecipe(recipeID)}
                ref={deleteRecipeButton => this.deleteRecipeButton = deleteRecipeButton}
              >
                Delete
              </button>
            </div>
          );
        }}
      </RecipesContextConsumer>
    )
  }

  handleRecipeClick = (e) => {
    if (e.target === this.editRecipeButton || e.target === this.deleteRecipeButton) return e.preventDefault();
    this.setState((prevState) => {
      return {
        isActive: !prevState.isActive
      };
    });
  };

  render() {
    const {
      recipe: { name, ingredients, id }
    } = this.props;
    const { isActive } = this.state;

    return (
      <div
        className='app__recipe'
        onClick={this.handleRecipeClick}
      >
        <p
          className='app__recipe-name'
        >
          {name}
        </p>
        <div className='app__recipe-content'>
          {isActive && Recipe.renderIngredients(ingredients)}
          {isActive && this.renderRecipeControls(id)}
        </div>
      </div>
    )
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default Recipe;