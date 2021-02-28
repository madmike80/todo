import React from 'react';

import styles from './AboutMe.module.css';

import Contacts from '../Contacts/Contacts';

const AboutMe = () => (
  <React.Fragment>
    <section className={styles.about}></section>
    <section className={styles.repo}></section>
  </React.Fragment>
);

export default AboutMe;
