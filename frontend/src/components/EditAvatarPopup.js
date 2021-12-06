import React from "react"
import { PopupWithForm } from "./PopupWithForm"

export function EditAvatarPopup(props) {

  const avatar = React.useRef()

  function handleSubmit(event) {
    event.preventDefault()
  
    props.onUpdateAvatar({
      avatar: avatar.current.value
    })
  } 
  
  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} title="Обновить аватар" buttonText="Сохранить" onSubmit={handleSubmit}> 
      <div className="popup__input-container">
        <input
          ref={avatar}
          className="popup__input"
          id="input_avatar-link"
          name="link"
          type="url"
          defaultValue=""
          placeholder="Ссылка на картинку"
          required/>
        <span
          className="popup__input-error"
          id="input_avatar-link-error"></span>
      </div>
    </PopupWithForm>
  )
}