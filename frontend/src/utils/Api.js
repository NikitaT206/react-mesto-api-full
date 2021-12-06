class Api {
  constructor() {
    this._url = 'https://mesto.nomoreparties.co/v1/cohort-27/'
    this._headers = { authorization: '9226f8e1-b342-433e-90bd-aa64e2df547e', 'Content-Type': 'application/json'}
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._url + 'users/me', {
      headers: this._headers
    })
      .then(this._returnRes)
  }

  getInitialCard() {
    return fetch(this._url + 'cards', {
      headers: this._headers
    })
      .then(this._returnRes)
  }

  setUserInfo(data) {
    return fetch(this._url + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }) 
    })
      .then(this._returnRes)
  }

  createCard(data) {
    return fetch(this._url + 'cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._returnRes)
  }

  deleteCard(data) {
    return fetch(this._url + `cards/${data._id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(this._returnRes)
  }

  changeLikeCardStatus(data, isLiked) {
    if (isLiked) {
      return this.setLike(data)
    } else {
      return this.deleteLike(data)
    }
  }

  setLike(data) {
    return fetch(this._url + `cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(this._returnRes)
  }

  deleteLike(data) {
    return fetch(this._url + `cards/likes/${data._id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._returnRes)
  }

  setAvatar(data) {
    return fetch(this._url + `users/me/avatar`, {
      headers: this._headers,
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
