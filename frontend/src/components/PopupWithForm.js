function PopupWithForm(props) {
  return (
    <section className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <form className="popup__container" name={props.name} onSubmit={props.onSubmit}>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__input-container">{props.children}</fieldset>
      </form>
    </section>
  )
}

export default PopupWithForm;