import React from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from './CloseIcon';
import { RecipesContextConsumer } from "../helpers/RecipesContext";


const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <RecipesContextConsumer>
      {({
          actions: { toggleModal },
        }) => {
        return (
          <div className='app__modal'>
            <div className='app__modal-content'>
              <div
                className='app__modal-close'
                onClick={toggleModal}
              >
                <CloseIcon />
              </div>
              {children}
            </div>
          </div>
        );
      }}
    </RecipesContextConsumer>,
    document.getElementById('modal')
  );
};

export default Modal;