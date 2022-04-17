import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      recipeIngredients: '',
      dataFetched: false,
    }
  }

  componentDidMount() {
    const {
      findRecipe,
      activeRecipeID
    } = this.props;

    if (activeRecipeID) {
      // I have used setTimeout to imitate data request
      setTimeout(() => {
        const { name, ingredients } = findRecipe(activeRecipeID);
        this.setState({
          recipeName: name,
          recipeIngredients: ingredients.join(', '),
          dataFetched: true
        });
      }, 2000);
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = () => {
    const {
      activeRecipeID,
      editRecipe,
      addRecipe,
    } = this.props;
    const {
      recipeName,
      recipeIngredients,
    } = this.state;

    activeRecipeID ?
      editRecipe(recipeName, recipeIngredients) :
      addRecipe(recipeName, recipeIngredients);
  };

  renderForm() {
    const {
      recipeName,
      recipeIngredients,
    } = this.state;
    const {
      activeRecipeID,
      toggleModal,
    } = this.props;

    return (
      <React.Fragment>
        <form className='app__recipe-form'>
          <fieldset className='app__recipe-form-fieldset'>
            <label
              className='app__recipe-form-label'
              htmlFor='recipe-name-field'>
              Recipe
            </label>
            <input
              className='app__recipe-form-field'
              type='text'
              name='recipeName'
              id='recipe-name-field'
              value={recipeName}
              onChange={this.handleInputChange}
            />
          </fieldset>
          <fieldset className='app__recipe-form-fieldset'>
            <label
              className='app__recipe-form-label'
              htmlFor='recipe-name-field'>
              Ingredients
            </label>
            <textarea
              className='app__recipe-form-field app__recipe-form-textarea'
              name='recipeIngredients'
              id='recipe-name-field'
              value={recipeIngredients}
              onChange={this.handleInputChange}
            />
          </fieldset>
        </form>
        {this.renderWarningMessage()}
        <div className='app__recipe-form-controls'>
          <button
            className='app__recipe-form-control button'
            onClick={this.handleFormSubmit}
          >
            {activeRecipeID ? 'Edit Recipe' : 'Add Recipe'}
          </button>
          <button
            className='app__recipe-form-control button button--tertiary'
            onClick={toggleModal}>
            Close
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderWarningMessage() {
    const {
      recipeName,
      recipeIngredients,
    } = this.state;
    const {
      activeRecipeID,
    } = this.props;

    if (activeRecipeID && !recipeName && !recipeIngredients) {
      return (
        <p className='app__warning-message'>
          Fields cannot be empty
        </p>
      );
    }
  }

  render() {
    const { activeRecipeID } = this.props;
    const { dataFetched } = this.state;
    const shouldRenderPlaceholder = activeRecipeID && !dataFetched;

    return (
      <div className='app__recipe-form-container'>
        <h3 className='app__recipe-form-title'>
          {activeRecipeID ? 'Edit Recipe' : 'Add a Recipe'}
        </h3>
        {shouldRenderPlaceholder ?
          <Loader /> :
          this.renderForm()
        }
      </div>
    );
  }
}

RecipeForm.propTypes = {
  activeRecipeID: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  findRecipe: PropTypes.func.isRequired,
  editRecipe: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
};

export default RecipeForm;