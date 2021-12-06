import React from 'react'
import { Card } from './Card'
import { CurrentUserContext } from '../context/CurrentUserContext'
import { CardContext } from '../context/CardContext'

export function Main(props) {

  const user = React.useContext(CurrentUserContext)
  const cards = React.useContext(CardContext)

  return (
  
    <main className="main-page">
      
      <section className="profile container">
        <div className="profile__info">
          <div className="profile__photo-container" onClick={props.onEditAvatar}>
            <img className="profile__photo" src={user.avatar} alt="Фотография профиля"></img>
          </div>
          <div className="profile__text-info">
            <h1 className="profile__name">{user.name}</h1>
            <button className="profile__edit-button opacity" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__job">{user.about}</p>
          </div>
        </div>
        <button className="profile__add-button opacity" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="places container">
        <ul className="places__list">
          {cards.map(card => {
            return (
              <Card card={card} onCardClick={props.onCardClick} key={card._id} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
            )
          })}
        </ul>
      </section>
    </main>
  )
}