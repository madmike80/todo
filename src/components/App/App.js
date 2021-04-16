import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom';

import styles from './App.module.css';
import logo from './img/whs-logo.svg';
import AboutMe from '../AboutMe/AboutMe';
import Todo from '../Todo/Todo';

const App = () => (
  <Router>
    <header className={styles.header}>
      <a href='https://webheroschool.ru/' className={styles.header__logo}>
        <img src={logo} alt='logo WHS'></img>
      </a>
      <menu className={styles.menu}>
        <NavLink
          to='/'
          exact
          className={styles.menu__link}
          activeClassName={styles.menu__link_activ}>
          Дела
        </NavLink>
        <NavLink
          to='/about'
          className={styles.menu__link}
          activeClassName={styles.menu__link_activ}>
          Обо мне
        </NavLink>
      </menu>
    </header>
    <Switch>
      <Route exact path='/' component={Todo} />
      <Route path='/about' component={AboutMe} />
    </Switch>
  </Router>
);

export default App;
