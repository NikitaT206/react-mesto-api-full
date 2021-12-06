import React from "react"
import { PopupWithForm } from "./PopupWithForm"
import { CurrentUserContext } from "../context/CurrentUserContext"
import { useEffect } from "react"

export function EditProfilePopup(props) {
  const user = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()
  
    props.onUpdateUser({
      name: name,
      about: description
    })
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value)
  }

  useEffect(() => {
    setName(user.name)
    setDescription(user.about)
  }, [user, props.isOpen])

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} title="Редактировать профиль" buttonText="Сохранить" onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          onChange={handleNameChange}
          className="popup__input"
          id="input_name"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ''}
         required/>
        <span 
          className="popup__input-error"
          id="input_name-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          onChange={handleDescriptionChange}
          className="popup__input"
          id="input_job"
          type="text"
          name="about"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          value={description || ''}
          required/>
        <span
          className="popup__input-error"
          id="input_job-error"></span>
      </div>
    </PopupWithForm>
  )
}