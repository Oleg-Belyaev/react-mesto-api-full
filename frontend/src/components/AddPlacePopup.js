import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup ({isOpen, onClose, onAddPlace, onLoading}) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  React.useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]);

  function handleSubmit (e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link
    })
  }

  return (
    <PopupWithForm name="card" title="Новое место" isOpen={isOpen} 
    onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__field">
        <input type="text" className={`popup__item ${errors.name && "popup__item_type_error"}`} 
        name="name" minLength="2" maxLength="40"
        placeholder="Название" id="name-input" value={values.name || ''} onChange={handleChange}/>
        <span className={`popup__item-error ${errors.name && "popup__item-error_active"}`}>{errors.name}</span>
      </div>
      <div className="popup__field">
        <input type="url" className={`popup__item ${errors.link && "popup__item_type_error"}`} name="link" 
        placeholder="Ссылка на картинку" id="link-input" value={values.link || ''} onChange={handleChange}/>
        <span className={`popup__item-error ${errors.link && "popup__item-error_active"}`}>{errors.link}</span>
      </div>
      <button type="submit" className={`popup__submit ${!isValid && "popup__submit_inactive"} `} 
      value="Создать">{onLoading ? 'Создать...' : 'Создать'}</button>        
    </PopupWithForm>
  )
}

export default AddPlacePopup;