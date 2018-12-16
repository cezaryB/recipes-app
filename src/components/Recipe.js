import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { RecipesContextConsumer } from "../helpers/RecipesContext";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    }
  }

  static renderIngredients(listOfIngredients) {
    return (
      <ul>
        {listOfIngredients.map((ingredient) => {
          return (
            <li className='app__recipe-ingredient' key={uuid()}>
              {ingredient}
            </li>
          );
        })}
      </ul>
    )
  }

  static renderRecipeControls(recipeID) {
    return (
      <RecipesContextConsumer>
        {({ actions: { toggleModal, deleteRecipe }}) => {
          return (
            <div className='app__recipe-controls'>
              <button onClick={() => deleteRecipe(recipeID)}>
                Delete
              </button>
              <button onClick={() => toggleModal(recipeID)}>
                Edit
              </button>
            </div>
          );
        }}
      </RecipesContextConsumer>
    )
  }

  renderRecipeDetailsAndControls() {
    const { recipe: { ingredients, id }} = this.props;
    return (
      <React.Fragment>
        {Recipe.renderIngredients(ingredients)}
        {Recipe.renderRecipeControls(id)}
      </React.Fragment>
    )
  }

  handleRecipeClick = () => {
    this.setState((prevState) => {
      return {
        isActive: !prevState.isActive
      };
    });
  };

  render() {
    const { recipe: { name }} = this.props;
    const { isActive } = this.state;

    return (
      <div
        className='app__recipe'
      >
        <p
          className='app__recipe-name'
          onClick={this.handleRecipeClick}
        >
          {name}
        </p>
        {isActive && this.renderRecipeDetailsAndControls()}
      </div>
    )
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default Recipe;