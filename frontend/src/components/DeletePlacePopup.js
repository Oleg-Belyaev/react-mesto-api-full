import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup ({isOpen, onClose, onDeletePlace, cardDelete}) {

  function handleSubmit (e) {
    e.preventDefault();
    onDeletePlace({cardDelete})
  }
  return (
    <PopupWithForm name="delete" title="Вы уверены?" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <button type="submit" className="popup__submit popup__submit_delete" value="Да">Да</button>    
    </PopupWithForm>
  )
}

export default DeletePlacePopup;