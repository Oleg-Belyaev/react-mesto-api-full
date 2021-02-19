import React from 'react';
import AuthWithForm from './AuthWithForm';
import { useForm } from '../hooks/useForm';
import { Link } from 'react-router-dom';

function Register (props) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  function handleSubmit (e) {
    e.preventDefault();
    props.onRegister({
      email: values.email,
      password: values.password
    })
    resetForm();
  }

  return (
    <AuthWithForm handleSubmit={handleSubmit} title="Регистрация">
      <div className="auth__field">
        <input type="email" className={`auth__item ${errors.email && "auth__item_type_error"}`} 
        name="email" placeholder="Email" id="email-input" required value={values.email || ''} onChange={handleChange}/>
        <span className={`auth__item-error ${errors.email && "auth__item-error_active"}`}>{errors.email}</span>
      </div>
      <div className="auth__field">
        <input type="password" className={`auth__item ${errors.password && "auth__item_type_error"}`} 
        name="password" placeholder="Пароль" id="password-input" required minLength="6" value={values.password || ''} onChange={handleChange}/>
        <span className={`auth__item-error ${errors.password && "auth__item-error_active"}`}>{errors.password}</span>
      </div>
      <button type="submit" className={`auth__submit ${!isValid && "auth__submit_inactive"} `} value="Войти">Войти</button>
      <p className="auth__text">Уже зарегистрированы? <Link className="auth__link" to="/sign-in" onClick={props.onClick}>Войти</Link></p>
    </AuthWithForm>
  )
}

export default Register;