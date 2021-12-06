import { Button } from "./Button"

export function PopupWithForm(props) {
 
  return (
     <div className={props.isOpen ? "popup popup_opened" : "popup"} id={props.name}>
        <div className="popup__container">
          <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
            {props.children}
            <Button buttonText={props.buttonText}/>
          </form>
          <button className="popup__close-button opacity" type="button" onClick={props.onClose}></button>
        </div>
     </div>
  )
}