import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup.js';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register.js';
import InfoToolTip from './InfoToolTip';
import { api, apiAuth } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [isAcceptPopupOpen, setIsAcceptPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState();
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState();
  const [isloading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [headerLink, setHeaderLink] = React.useState('Регистрация');
  const [isAuthAccept, setIsAuthAccept] = React.useState(false);
  const history = useHistory();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.editUserInfo(userData)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.editAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(cardDelete) {
    setIsDeletePlacePopupOpen(true);
    setCardDelete(cardDelete);
  }

  function handlePlaceDeleteAccept({cardDelete}) {
    api.deleteCard(cardDelete._id).then(() => {
      const newCards = cards.filter((c) => c._id !== cardDelete._id);
      setCards(newCards);
      closeAllPopups();
    }) 
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(newCardData) {
    setIsLoading(true);
    api.createCard(newCardData).then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleRegister(newUserData) {
    apiAuth.signUp(newUserData)
    .then((userData) => {
      console.log(userData);
      history.push('/sign-in');
      setIsAcceptPopupOpen(true);
      setIsAuthAccept(true);
    })
    .catch((err) => {
      setIsAcceptPopupOpen(true);
      setIsAuthAccept(false);
      console.log(err)
    })
  }

  function handleLogin({email, password}) {
    apiAuth.singIn({email, password})
    .then((data) => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setEmail(email);
      setHeaderLink('Выйти')
      history.push('/')
    })
    .catch((err) => {
      setIsAcceptPopupOpen(true);
      setIsAuthAccept(false);
      console.log(err)
    })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard();
    setIsAcceptPopupOpen(false)
  }

  function redirect() {
    const link = headerLink;
    if (link === 'Регистрация') {
      history.push('/sign-up');
      setHeaderLink('Войти')
    } else if (link === 'Войти') {
      history.push('/sign-in');
      setHeaderLink('Регистрация')
    } else if (link === 'Выйти') {
      setLoggedIn(false);
      setHeaderLink('Регистрация');
      setEmail('');
      localStorage.removeItem('token');
    }
  }

  React.useEffect(() => {
    if(localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      apiAuth.checkToken(token)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          history.push('/')
          setEmail(res.data.email);
          setHeaderLink('Выйти')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [history])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ]).then(([data, items]) => {
        setCurrentUser(data);
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} link={headerLink} onClick={redirect} auth={loggedIn}/>
        <Switch>
          <Route exact path="/">
            <ProtectedRoute component={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
            cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          </Route>
          <Route path="/sign-up">
            <Register onClick={redirect} onRegister={handleRegister}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} onLoading={isloading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} 
        onUpdateAvatar={handleUpdateAvatar} onLoading={isloading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} 
        onAddPlace={handleAddPlaceSubmit} onLoading={isloading} />
        <DeletePlacePopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} 
        onDeletePlace={handlePlaceDeleteAccept} cardDelete={cardDelete} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip isOpen={isAcceptPopupOpen} onClose={closeAllPopups} isAccept={isAuthAccept}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
