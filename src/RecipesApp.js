import React, { Component } from 'react';
import uuid from 'uuid';
import RecipesList from './components/RecipesList';
import RecipeModal from './components/RecipeModal';
import store from './store/store.json';
import { RecipesContext } from './helpers/RecipesContext';
import { saveItem, returnItem } from './helpers/storageHelpers';
import CONFIG from './config';

class RecipesApp extends Component {
  constructor() {
    super();
    this.state = {
      recipesList: [ ...store.recipesList ],
      activeRecipeID: '',
      showModal: false,
    }
  }

  componentDidMount() {
    const storageRecipes = returnItem(CONFIG.RECIPES_STORAGE);
    storageRecipes && this.setState({ recipesList: storageRecipes });
  }

  toggleModal = (recipeID = '') => {
    this.setState((prevState) => {
      if (prevState.showModal) return { activeRecipeID: null, showModal: !prevState.showModal };
      return { activeRecipeID: recipeID, showModal: !prevState.showModal };
    });
  };

  findRecipe = () => {
    const {
      recipesList,
      activeRecipeID
    } = this.state;

    return recipesList.find(recipe => recipe.id === activeRecipeID);
  };

  editRecipe = (name, ingredients) => {
    const {
      recipesList,
      activeRecipeID,
    } = this.state;

    const updatedRecipesList = recipesList.map((recipe) => {
      if (recipe.id === activeRecipeID ) return {
        name,
        ingredients: ingredients.split(' '),
        id: uuid()
      };
      return recipe
     });

    this.setState(() => {
      return { recipesList: updatedRecipesList };
    }, () => {
      saveItem(CONFIG.RECIPES_STORAGE, this.state.recipesList);
      this.toggleModal();
    });
  };

  deleteRecipe = (recipeID) => {
    const { recipesList } = this.state;

    const updatedRecipesList = recipesList.filter(recipe => recipe.id !== recipeID);

    this.setState(() => {
      return { recipesList: updatedRecipesList };
    }, () => saveItem(CONFIG.RECIPES_STORAGE, this.state.recipesList));
  };

  addRecipe = (name, ingredients) => {
    const newRecipe = { name, ingredients: ingredients.split(' '), id: uuid() };
    this.setState((prevState) => {
      return { recipesList: [ ...prevState.recipesList, newRecipe ]};
    }, () => {
        saveItem(CONFIG.RECIPES_STORAGE, this.state.recipesList);
        this.toggleModal();
    });
  };

  render() {
    const { showModal } = this.state;
    const {
      toggleModal,
      findRecipe,
      editRecipe,
      deleteRecipe,
      addRecipe,
    } = this;

    return (
      <div className='app'>
        <RecipesContext.Provider value={
          {
            data: this.state,
            actions: { toggleModal, findRecipe, editRecipe, deleteRecipe, addRecipe }
          }
        }>
          <RecipesList />
          <button onClick={() => this.toggleModal()}>
            Add recipe
          </button>
          {showModal && <RecipeModal />}
        </RecipesContext.Provider>
      </div>
    );
  }
}

export default RecipesApp;
