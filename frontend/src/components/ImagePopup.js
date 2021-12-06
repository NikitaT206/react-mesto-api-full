export function ImagePopup(props) {

  return (
    <div className={props.card.link ? "popup popup_opened" : "popup"} id="popupImage">
      <div className="popup__figure-container">
        <figure className="popup__figure">
          <img className="popup__image" src={props.card.link} alt={props.card.name}/>
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
        <button className="popup__close-button opacity" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}