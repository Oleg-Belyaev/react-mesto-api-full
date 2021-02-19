import React from 'react';
import editButtonPath from '../images/edit-button.svg';
import addButtonPath from '../images/add-button.svg';
import Card from '../components/Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const userAvatar = { backgroundImage: `url(${currentUser ? currentUser.avatar : ''})` };

  return (
    <main className="content page__section">
      <section className="profile content__section">
        <div className="profile__data">
          <div className="profile__avatar" style={userAvatar} onClick={props.onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__names">
              <h1 className="profile__name">{currentUser ? currentUser.name : null}</h1>
              <button className="button profile__button-edit" type="button" onClick={props.onEditProfile}>
                <img src={editButtonPath} alt="Карандаш" className="button__edit" />
              </button>
            </div>
            <p className="profile__profession">{currentUser ? currentUser.about : null}</p>
          </div>
        </div>
        <button className="button profile__button-add" type="button" onClick={props.onAddPlace}>
          <img src={addButtonPath} alt="Плюс" className="button__add" />
        </button>
      </section>
      <section className="elements content__section content__section_has_indent">
        {props.cards.map((card) => {
        return <Card {...card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        }
        )}
      </section>
    </main>
  )
}

export default Main;