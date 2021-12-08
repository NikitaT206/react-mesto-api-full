import React from "react"
import { CurrentUserContext } from "../context/CurrentUserContext"

export function Card(props) {

  const user = React.useContext(CurrentUserContext)
  const isOwn = user._id === props.card.owner
  const isLiked = props.card.likes.some((i => i === user._id))

  function handleClick() {
    props.onCardClick(props.card)
  }  

  function handleLike() {
    props.onCardLike(props.card)
  }

  function handleDelete() {
    props.onCardDelete(props.card)
  }

  return (
      <li className="place">
        <div className="place__image-container" onClick={handleClick}>
          <img className="place__image" src={props.card.link} alt={props.card.name}/>
        </div>
        <button className={isOwn ? "place__delete-button opacity" : "place__delete-button_hidden"} type="button" onClick={handleDelete}></button>
        <div className="place__text-block">
          <h3 className="place__name">{props.card.name}</h3>
          <div className="place__like-container">
            <button className={isLiked ? "place__like place__like_active" : "place__like"} type="button" onClick={handleLike}></button>
            <span className="place__like-counter">{props.card.likes.length}</span>
          </div>
        </div>
      </li>
  )
}