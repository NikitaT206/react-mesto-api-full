import registrationOkIcon from '../images/icons/Union.svg'
import registrationNotOkIcon from '../images/icons/Union-2.svg'

export function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? "popup popup_opened" : "popup"}>
      <div className="popup__container">
        <div className="popup__login-status-container">
          <img className="popup__login-status-image" src={props.isOk ? registrationOkIcon : registrationNotOkIcon} alt='Статус регистрации'></img>
          <p className='popup__login-status-text'>{props.isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        </div>
        <button className="popup__close-button opacity" type="button" onClick={props.onClose}></button>

      </div>
    </div>
  )
}