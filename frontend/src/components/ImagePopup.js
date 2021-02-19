function ImagePopup (props) {
  return (
    <section className={`popup ${props.card && 'popup_opened'}`}>
      <div className="popup__overlay" onClick={props.card ? props.onClose : null}></div>
      <div className="popup__imagecontainer">
        <button className="popup__close popup__close_image" type="button" onClick={props.card ? props.onClose : null}></button>
        <figure className="popup__figure">
          <img className="popup__image" src={props.card ? props.card.link : null} alt={props.card ? props.card.name : null} />
          <figcaption className="popup__caption">{props.card ? props.card.name : null}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default ImagePopup;