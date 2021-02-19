import headerLogoPath from '../images/header-logo.svg';

function Header(props) {
  return (
    <header className="header page__section">
        <img src={headerLogoPath} alt="Логотип" className="header__logo" />
        <div className="header__container">
          <p className="header__text">{props.email}</p>
          <p className={`header__text header__text_link ${props.auth && 'header__text_auth'}`} onClick={props.onClick}>{props.link}</p>
        </div>
    </header>
  )
}

export default Header;
