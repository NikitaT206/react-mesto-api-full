import { useState } from "react"

export function Login(props) {
  
  const [data, setData] = useState({email: '', password: ''})

  function handleChange(event) {
    const {name, value} = event.target
    setData({
      ...data,
      [name] : value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    props.onLogin(data)
  }

  return (
    <div className='login'>
      <h2 className="login__title">Вход</h2>
      <form className='login__form' onSubmit={handleSubmit}>
        <input 
          className='login__input'
          placeholder='Email'
          type='email'
          name='email'
          value={data.email}
          onChange={handleChange}
          formNoValidate
          required></input>
        <input 
          className='login__input'
          placeholder='Пароль'
          type='password'
          name='password'
          value={data.password}
          onChange={handleChange}
          formNoValidate
          required></input>
        <button
          className='login__submit-button opacity'
          type='submit'
          >Войти</button>
      </form>
    </div>
  )
}