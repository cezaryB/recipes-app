import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeIngredients: '',
    }
  }

  componentDidMount() {
    const {
      findRecipe,
      activeRecipeID
    } = this.props;

    if (activeRecipeID) {
      const { name, ingredients } = findRecipe(activeRecipeID);
      this.setState({ recipeName: name, recipeIngredients: ingredients.join(', ') });
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderForm() {
    const {
      recipeName,
      recipeIngredients,
    } = this.state;
    const {
      activeRecipeID,
      toggleModal,
      editRecipe,
      addRecipe,
    } = this.props;

    return (
      <React.Fragment>
        <form className='app__recipe-modal-form'>
          <fieldset className='app__recipe-modal-fieldset'>
            <input
              type='text'
              name='recipeName'
              id='recipe-name-field'
              value={recipeName}
              onChange={this.handleInputChange}
            />
            <label htmlFor='recipe-name-field'>
              Recipe
            </label>
          </fieldset>
          <fieldset className='app__recipe-modal-fieldset'>
            <textarea
              name='recipeIngredients'
              id='recipe-name-field'
              value={recipeIngredients}
              onChange={this.handleInputChange}
            />
            <label htmlFor='recipe-name-field'>
              Ingredients
            </label>
          </fieldset>
        </form>
        <div className='app__recipe-modal-buttons'>
          <button
            onClick={activeRecipeID ?
              () => editRecipe(recipeName, recipeIngredients) :
              () => addRecipe(recipeName, recipeIngredients)
            }
          >
            {activeRecipeID ? 'Edit Recipe' : 'Add Recipe'}
          </button>
          <button onClick={toggleModal}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { activeRecipeID } = this.props;
    const {
      recipeName,
      recipeIngredients,
    } = this.state;
    const shouldRenderPlaceholder = activeRecipeID && !recipeName && !recipeIngredients;

    return (
      <div className='app__recipe-modal'>
        <div className='app__recipe-modal-content'>
          <h2 className='app__recipe-modal-title'>
            {activeRecipeID ? 'Edit Recipe' : 'Add a Recipe'}
            {shouldRenderPlaceholder ?
              <div>Still loading data</div> :
              this.renderForm()
            }
          </h2>
        </div>
      </div>
    );
  }
}

RecipeModalContent.propTypes = {
  activeRecipeID: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  findRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
};

export default RecipeModalContent;