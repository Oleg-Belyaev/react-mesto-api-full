import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, onLoading}) {
  const {values, errors, isValid, handleChange, resetForm} = useForm();
  
  React.useEffect(() => {
      resetForm();
    }, [isOpen, resetForm])

  function handleSubmit (e) {
    e.preventDefault();
    onUpdateAvatar({avatar: values.link});
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} 
    onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__field">
        <input type="url" className={`popup__item ${errors.link && "popup__item_type_error"}`} name="link" placeholder="Ссылка на аватар" 
        id="link-input" value={values.link || ''} required onChange={handleChange}/>
        <span className={`popup__item-error ${errors.link && "popup__item-error_active"}`}>{errors.link}</span>
      </div>
      <button type="submit" className={`popup__submit ${!isValid && "popup__submit_inactive"} `} value="Сохранить">
        {onLoading ? 'Сохранить...' : 'Сохранить'}
      </button>       
    </PopupWithForm>
  )
}

export default EditAvatarPopup;