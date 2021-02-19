const handleOriginalResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
};

class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })  
    .then(handleOriginalResponse)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })  
    .then(handleOriginalResponse)
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about 
      })
    })  
    .then(handleOriginalResponse)
  }

  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link 
      })
    })  
    .then(handleOriginalResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })  
    .then(handleOriginalResponse)
  }
  
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
      })  
    .then(handleOriginalResponse)
    } else {
    return fetch(`${this._url}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: this._headers,
    })  
    .then(handleOriginalResponse)
    }
  }

  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })  
    .then(handleOriginalResponse)
  }

  signUp(newUserData) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: newUserData.password,
        email: newUserData.email
      })
    })
    .then(handleOriginalResponse)
  }

  singIn(UserData) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: UserData.password,
        email: UserData.email
      })
    })
    .then(handleOriginalResponse)
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      } 
    })
    .then(handleOriginalResponse)
  }
}

const api = new Api ({
  headers: {
    authorization: 'faa09cc7-7270-48b0-804c-b072edafec63',
    'Content-Type': 'application/json'
  },
  url: 'https://mesto.nomoreparties.co/v1/cohort-17'
});

const apiAuth = new Api({
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'https://auth.nomoreparties.co'
})

export {api, apiAuth};