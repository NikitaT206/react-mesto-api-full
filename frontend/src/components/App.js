import '../index.css'
import React, { useEffect } from 'react'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { useState } from 'react'
import { api } from '../utils/Api'
import { auth } from '../utils/Auth'
import { CurrentUserContext } from '../context/CurrentUserContext'
import { CardContext } from '../context/CardContext'
import { ImagePopup } from './ImagePopup'
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup } from './EditAvatarPopup'
import { AddPlacePopup } from './AddPlacePopup'
import { Login } from './Login'
import { Register } from './Register'
import { InfoTooltip } from './InfoTooltip'
import { Switch } from 'react-router'
import { Route } from 'react-router'
import ProtectedRoute from './ProtectedRoute'
import { withRouter } from 'react-router'
import { useHistory } from 'react-router'

function App() {
  const [addPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [editProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [editAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  const [registration, setRegistration] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [burgerOpen, setBurgerOpen] = useState(false)

  const history = useHistory()

  function handleBurgerChange() {
    setBurgerOpen(!burgerOpen)
  }

  function handleRegistration(data) {
    auth.registration(data).then(() => {
      setRegistration(true)
      setInfoTooltipOpen(true)
      history.push('/signin')
    }).catch((err) => {
      setRegistration(false)
      setInfoTooltipOpen(true)
      console.log(err)
    })
  }

  function handleLogin(data) {
    auth.authorization(data).then((data) => {
      localStorage.setItem('token', data.data)
      const token = localStorage.getItem('token')
      if (token) {
        setLoggedIn(true)
        if (loggedIn) {
          history.push('/')
        }
      }
    }).catch((err) => {
      setRegistration(false)
      setInfoTooltipOpen(true)
      console.log(err)
    })
  }

  function handleLogOut() {
    setCurrentUser({})
    setBurgerOpen(false)
    setLoggedIn(false)
    localStorage.removeItem('token')
  }

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      auth.getContent(localStorage.getItem('token')).then((data) => {
        if (data) {
          setEmail(data.data[0].email)
          setCurrentUser(data.data[0])
          setLoggedIn(true)
          if (loggedIn) {
            history.push('/')
          }
        }
      }).catch(err => console.log(err))  
    }
  }
  
  useEffect(() => {
    tokenCheck()  
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      api.getUserInfo(localStorage.getItem('token')).then(data => {
        setCurrentUser(data.data[0])
      }).catch(err => console.log(err))
    
      api.getInitialCard(localStorage.getItem('token')).then(data => {
        setCards(data.data, ...cards)
      }).catch(err => console.log(err))
    }
  }, [loggedIn, history])

  useEffect(() => {
    const closeByEscape = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups()
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id)

    api.changeLikeCardStatus(card, !isLiked, localStorage.getItem('token'))
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
  }).catch(err => console.log(err))
  } 

  function handleCardDelete(card) {
    api.deleteCard(card, localStorage.getItem('token')).then(() => {
      const newCards = cards.filter(item => item !== card)
      setCards(newCards)
    }).catch(err => console.log(err))
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data, localStorage.getItem('token')).then(data => {
      setCurrentUser(data.data)
      closeAllPopups()
    }).catch(err => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data, localStorage.getItem('token')).then(data => {
      setCurrentUser(data.data)
      closeAllPopups()
    }).catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data, localStorage.getItem('token')).then((data) => {
      setCards([data.data, ...cards])
      closeAllPopups()
    }).catch(err => console.log(err))
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setInfoTooltipOpen(false)
    setSelectedCard({name: '', link: ''})
  }  

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cards}>

          <EditAvatarPopup isOpen={editAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
          <EditProfilePopup isOpen={editProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
          <AddPlacePopup isOpen={addPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          <InfoTooltip isOpen={infoTooltipOpen} isOk={registration} onClose={closeAllPopups}/>
          <Header email={email} onLogOut={handleLogOut} onBurgerClick={handleBurgerChange} burgerOpen={burgerOpen}/>

          <Switch>
            <Route path='/signup'>
              <Register onRegister={handleRegistration}/>
            </Route>
            <Route path='/signin'>
              <Login onLogin={handleLogin}/>
            </Route>
            <ProtectedRoute 
              path='/'
              loggedIn={loggedIn}
              component={Main}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
            />
          </Switch>
          <Footer/>
        </CardContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
