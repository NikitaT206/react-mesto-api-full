const jwt = localStorage.getItem('token')
class Api {
  constructor() {
    this._url = 'https://mesto.nikitat206.back.ru.nomoredomains.rocks/'
    this._headers = { authorization: 'Bearer ' + jwt, 'Content-Type': 'application/json', credentials: "include"}
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo(token) {
    return fetch(this._url + 'users/me', {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    })
      .then(this._returnRes)
  }

  getInitialCard(token) {
    return fetch(this._url + 'cards', {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }
    })
      .then(this._returnRes)
  }

  setUserInfo(data, token) {
    return fetch(this._url + 'users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }) 
    })
      .then(this._returnRes)
  }

  createCard(data, token) {
    return fetch(this._url + 'cards', {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._returnRes)
  }

  deleteCard(data, token) {
    return fetch(this._url + `cards/${data._id}`, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'DELETE'
    })
      .then(this._returnRes)
  }

  changeLikeCardStatus(data, isLiked, token) {
    if (isLiked) {
      return this.setLike(data, token)
    } else {
      return this.deleteLike(data, token)
    }
  }

  setLike(data, token) {
    return fetch(this._url + `cards/${data._id}/likes`, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then(this._returnRes)
  }

  deleteLike(data, token) {
    return fetch(this._url + `cards/${data._id}/likes`, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then(this._returnRes)
  }

  setAvatar(data, token) {
    return fetch(this._url + `users/me/avatar`, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      })
    }
    )
      .then(this._returnRes)
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCard()])
  }
}

export const api = new Api()
