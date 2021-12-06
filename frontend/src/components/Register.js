import { Link } from "react-router-dom"
import { useState } from "react";

export function Register(props) {

  const [data, setData] = useState({email:'', password: ''})

  function handleChange(event) {
    const {name, value} = event.target
    setData({
      ...data,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    props.onRegister(data)
  }

  return (
    <div className='login'>
      <h2 className="login__title">Регистрация</h2>
      <form className='login__form' onSubmit={handleSubmit}>
        <input 
          className='login__input'
          placeholder='Email'
          type='email'
          name='email'
          value={data.email}
          formNoValidate
          onChange={handleChange}
          required></input>
        <input 
          className='login__input'
          placeholder='Пароль'
          type='password'
          name='password'
          value={data.password}
          formNoValidate
          onChange={handleChange}
          required></input>
        <button 
          className='login__submit-button opacity'
          type='submit'
          >Зарегистрироваться</button>
      </form>
      <Link className='login__sign-in-link opacity' to='/signin'>Уже зарегистрированы? Войти</Link>
    </div>
  )
}