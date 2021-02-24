import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const isLiked = props.likes.some(item => item === currentUser._id);
  const cardDeleteButtonClassName = (`button element__button-remove ${isOwn ? null : 'element__button-remove_hidden'}`);
  const cardLikeButtonClassName = (`button element__button-like ${isLiked ? 'element__button-like_active' : null}`)

  function handleClick () {
    props.onCardClick(props);
  }

  function handleLikeClick () {
    props.onCardLike(props);
  }

  function handleDeleteClick () {
    props.onCardDelete(props);
  }  

  return (
    <div className="element">
      <img src={props.link} alt={props.name} className="element__image" onClick={handleClick}/>
      <div className="element__caption">
        <p className="element__name">{props.name}</p>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.likes.length}</p>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
    </div>
  )
}

export default Card;