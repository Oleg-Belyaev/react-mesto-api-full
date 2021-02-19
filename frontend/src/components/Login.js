import React from 'react';
import AuthWithForm from './AuthWithForm';
import { useForm } from '../hooks/useForm';

function Login (props) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  function handleSubmit (e) {
    e.preventDefault();
    props.onLogin({
      email: values.email,
      password: values.password
    })
    resetForm();
  }

  return (
    <AuthWithForm handleSubmit={handleSubmit} title="Вход">
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
    </AuthWithForm>
  )
}

export default Login;
