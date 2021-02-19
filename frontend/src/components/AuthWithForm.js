function AuthWithForm (props) {
  return (
    <section className="auth page__section">
      <form className="auth__form" name="login" onSubmit={props.handleSubmit}>
        <h2 className="auth__title">{props.title}</h2>
        <fieldset className="auth__input-container">{props.children}</fieldset>
      </form>
    </section>
  )
}

export default AuthWithForm;
