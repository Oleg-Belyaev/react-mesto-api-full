import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditProfilePopup ({isOpen, onClose, onUpdateUser, onLoading}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = useForm();
  
  React.useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true)
    }
  }, [currentUser, resetForm]);

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    })
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" 
    isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__field">
        <input type="text" className={`popup__item ${errors.name && "popup__item_type_error"}`} 
        name="name" placeholder="Имя Фамилия" id="name-input" 
        value={values.name || ''} onChange={handleChange} required minLength="2" maxLength="40"/>
        <span className={`popup__item-error ${errors.name && "popup__item-error_active"}`}>{errors.name}</span>
      </div>
      <div className="popup__field">
        <input type="text" className={`popup__item ${errors.about && "popup__item_type_error"}`} 
        name="about" placeholder="Профессия" id="about-input" 
        value={values.about || ''} onChange={handleChange} required minLength="2" maxLength="200"/>
        <span className={`popup__item-error ${errors.about && "popup__item-error_active"}`}>{errors.about}</span>
      </div>
      <button type="submit" className={`popup__submit ${!isValid && "popup__submit_inactive"} `} 
      value="Сохранить">{onLoading ? 'Сохранить...' : 'Сохранить'}</button>        
    </PopupWithForm>
  )
}

export default EditProfilePopup;