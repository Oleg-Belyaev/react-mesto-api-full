const handleOriginalResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`ошибка: ${res.status} ${res.message}`);
};

class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.url;
  }

  getUserInfo(token) {
    this._headers.authorization = `Bearer ${token}`;
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })  
    .then(handleOriginalResponse)
  }

  getInitialCards(token) {
    this._headers.authorization = `Bearer ${token}`;
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })  
    .then(handleOriginalResponse)
  }

  editUserInfo(data, token) {
    this._headers.authorization = `Bearer ${token}`;
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

  createCard(data, token) {
    this._headers.authorization = `Bearer ${token}`;
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

  deleteCard(id, token) {
    this._headers.authorization = `Bearer ${token}`;
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })  
    .then(handleOriginalResponse)
  }
  
  changeLikeCardStatus(id, isLiked, token) {
    this._headers.authorization = `Bearer ${token}`;
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      })  
    .then(handleOriginalResponse)
    } else {
    return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: this._headers,
    })  
    .then(handleOriginalResponse)
    }
  }

  editAvatar(data, token) {
    this._headers.authorization = `Bearer ${token}`;
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
        email: newUserData.email,
        password: newUserData.password,
      })
    })
    .then(handleOriginalResponse)
  }

  singIn(UserData) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: UserData.email,
        password: UserData.password,
      })
    })
    .then(handleOriginalResponse)
  }

  checkToken(token) {
    this._headers.authorization = `Bearer ${token}`;
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(handleOriginalResponse)
  }
}

const api = new Api ({
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'https://api.olegbelyaev.students.nomoreparties.space'
});

export { api };