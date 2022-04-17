import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import Jumbotron from './components/Jumbotron';
import RecipesList from './components/RecipesList';
import Modal from './components/Modal';
import Loader from './components/Loader';
import RecipeForm from "./components/RecipeForm";
import CONFIG from './config';
import store from './store/store.json';
import { RecipesContext } from './helpers/RecipesContext';
import { saveItem, returnItem } from './helpers/storageHelpers';
import { translateTextToArray } from "./helpers/stringHelpers";

class RecipesApp extends Component {
  constructor() {
    super();
    this.state = {
      recipesList: [],
      activeRecipeID: '',
      showModal: false,
      dataAvailable: false,
    }
  }

  componentDidMount() {
      const storageRecipes = returnItem(CONFIG.RECIPES_STORAGE);
    // I have used setTimeout to imitate data request
    setTimeout(() => {
      this.setState(() => {
        if (storageRecipes && storageRecipes.length) return { recipesList: [ ...storageRecipes ], dataAvailable: true };
        return { recipesList: [ ...store.recipesList ], dataAvailable: true };
      });
    }, 2000);
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
    if (!name && !ingredients) return;

    const {
      recipesList,
      activeRecipeID,
    } = this.state;

    const updatedRecipesList = recipesList.map((recipe) => {
      if (recipe.id === activeRecipeID ) return {
        name,
        ingredients: translateTextToArray(ingredients),
        id: recipe.id,
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
    const newRecipe = { name, ingredients: translateTextToArray(ingredients), id: uuidv4() };
    this.setState((prevState) => {
      return { recipesList: [ ...prevState.recipesList, newRecipe ]};
    }, () => {
        saveItem(CONFIG.RECIPES_STORAGE, this.state.recipesList);
        this.toggleModal();
    });
  };

  handleRenderLogic() {
    const {
      showModal,
      recipesList,
      activeRecipeID,
      dataAvailable,
    } = this.state;
    const {
      toggleModal,
      findRecipe,
      editRecipe,
      deleteRecipe,
      addRecipe,
    } = this;

    if (dataAvailable) {
      return (
        <RecipesContext.Provider value={
          {
            data: this.state,
            actions: { toggleModal, deleteRecipe }
          }
        }>
          {recipesList.length ?
            <RecipesList
              recipesList={recipesList}
            /> :
            <p className='app__warning-message'>Your recipes list is empty</p>
          }
          <button
            className='app__main-button button'
            onClick={() => this.toggleModal()}
          >
            Add recipe
          </button>
          {showModal &&
          <Modal>
            <RecipeForm
              activeRecipeID={activeRecipeID}
              toggleModal={toggleModal}
              findRecipe={findRecipe}
              editRecipe={editRecipe}
              addRecipe={addRecipe}
            />
          </Modal>
          }
        </RecipesContext.Provider>
      );
    }

    return <Loader />;
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <Jumbotron callToAction='List of your everyday recipes:' />
        <div className='app__container container'>
          {this.handleRenderLogic()}
        </div>
      </div>
    );
  }
}

export default RecipesApp;
