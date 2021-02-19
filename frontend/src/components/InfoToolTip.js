import React from 'react';
import PopupWithForm from './PopupWithForm';
import acceptIcon from '../images/accept.jpg';
import errorIcon from '../images/error.jpg';

function InfoToolTip({isOpen, onClose, isAccept}) {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <img src={isAccept ? acceptIcon : errorIcon} alt="Логотип" className="popup__icon"/>
      <h2 className='popup__title popup__title_accept'>{isAccept ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
    </PopupWithForm>
  )
}

export default InfoToolTip;
