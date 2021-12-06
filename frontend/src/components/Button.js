export function Button(props) {
  return (
    <button 
      className="popup__save-button"
      type="submit">
      {props.buttonText}
    </button>
  )
}