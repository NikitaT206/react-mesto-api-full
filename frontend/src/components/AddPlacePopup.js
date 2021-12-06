import React from "react"
import { PopupWithForm } from "./PopupWithForm"

export function AddPlacePopup(props) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleLinkChange(event) {
    setLink(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    props.onAddPlace({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} title="Новое место" buttonText="Создать" onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          onChange={handleNameChange}
          className="popup__input"
          id="input_place-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          required/>
        <span
          className="popup__input-error"
          id="input_place-name-error"></span>
      </div>

      <div className="popup__input-container">
        <input
          onChange={handleLinkChange}
          className="popup__input"
          id="input_place-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          required/>
        <span
          className="popup__input-error"
          id="input_place-link-error"></span>
      </div>
    </PopupWithForm>
  )
}