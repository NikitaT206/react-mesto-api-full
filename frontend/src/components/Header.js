import logo from '../images/logo/Mesto.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from 'react-router';
import { Route } from 'react-router';

export function Header(props) {

  return (
    <>
    {props.burgerOpen ? ( 
      <div className='header__user-info_mobile'>
        <p className='header__link header__link_mobile'>{props.email}</p>
        <Link className='header__link header__link_muted opacity ' to='/signin' onClick={props.onLogOut}>Выйти</Link>
      </div>) : ''}
    
    <header className='header'>
      <div className='header__container'>
        <img className='header__logo' src={logo} alt='Логотип Mesto'></img>
        <Switch>
          <Route path='/signin'>
            <Link className='header__link opacity' to='/signup'>Регистрация</Link>
          </Route>
          <Route path='/signup'>
            <Link className='header__link opacity' to='/signin'>Войти</Link>
          </Route>
          <Route path='/'>
            {!props.burgerOpen ? (
            <div className='header__burger-menu opacity' onClick={props.onBurgerClick}>
              <div className='header__burger-line'></div>
              <div className='header__burger-line'></div>
              <div className='header__burger-line'></div>
            </div>) : (
            <div className='header__burger-menu opacity' onClick={props.onBurgerClick}>
              <div className='header__burger-line-cross_left'></div>
              <div className='header__burger-line-cross_right'></div>
            </div>)}
        
            <div className='header__user-info'>
              <p className='header__link'>{props.email}</p>
              <Link className='header__link header__link_muted opacity' to='/signin' onClick={props.onLogOut}>Выйти</Link>
            </div>
          </Route>
        </Switch>
      </div>
    </header>
    </>
  )
}