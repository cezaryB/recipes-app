import React from 'react';
import ReactDOM from 'react-dom';
import RecipeModalContent from './RecipeModalContent';
import { RecipesContextConsumer } from "../helpers/RecipesContext";


const RecipeModal = () => {
  return ReactDOM.createPortal(
    <RecipesContextConsumer>
      {({
          data: { activeRecipeID },
          actions: { toggleModal, findRecipe, editRecipe, addRecipe },
        }) => {
        return <RecipeModalContent
          activeRecipeID={activeRecipeID}
          toggleModal={toggleModal}
          findRecipe={findRecipe}
          editRecipe={editRecipe}
          addRecipe={addRecipe}
        />
      }}
    </RecipesContextConsumer>,
    document.getElementById('modal')
  );
};

export default RecipeModal;