class Auth {
  constructor(url) {
    this._url = url
  }

  _returnRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  registration(data) {
    return fetch(this._url + 'signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email
      }) 
    })
      .then(this._returnRes)
  }

  authorization(data) {
    return fetch(this._url + 'signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email
      }) 
    })
    .then(this._returnRes)
  }

  getContent(token) {
    return fetch(this._url + 'users/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    .then(this._returnRes)
  }
}

export const auth = new Auth('https://mesto.nikitat206.back.ru.nomoredomains.rocks/')