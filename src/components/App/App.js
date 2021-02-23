import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
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
          <span className={styles.menu__linkItem}>Дела</span>
        </NavLink>
        <NavLink
          to='/AboutMe'
          className={styles.menu__link}
          activeClassName={styles.menu__link_activ}>
          <span className={styles.menu__linkItem}>Обо мне</span>
        </NavLink>
      </menu>
    </header>
    <section className={styles.content}>
      <Route path='/' exact component={Todo} />
      <Route path='/AboutMe' component={AboutMe} />
    </section>
  </Router>
);

export default App;
