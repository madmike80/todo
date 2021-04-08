import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

import styles from './AboutMe.module.css';
import RepoList from '../RepoList/RepoList';
import email_logo from './img/email_logo.png';
import telegram_logo from './img/telegram_logo.png';
import github_logo from './img/github_logo.png';
import linkedin_logo from './img/linkedin_logo.png';
import vk_logo from './img/vk_logo.png';
import facebook_logo from './img/facebook_logo.png';

const octokit = new Octokit();
const AboutMe = () => {
  const [state, setState] = useState({
    username: 'madmike80',
    userInfo: [],
  });

  useEffect(() => {
    octokit.users
      .getByUsername({
        username: state.username,
      })
      .then(({ data }) => {
        setState({
          isLoading: false,
          userInfo: data,
        });
      })
      .catch(() => {
        setState({
          incorrectRequest: true,
        });
      });
  }, []);

  return (
    <React.Fragment>
      <section className={styles.about}>
        <img
          className={styles.avatar}
          src={state.userInfo.avatar_url}
          alt='Avatar'
        />
        <div className={styles.info}>
          <h1 className={styles.name}>{state.userInfo.name}</h1>
          <p className={styles.bio}>{state.userInfo.bio}</p>
          <a className={styles.contact} href='mailto: ilyakd@gmail.com'>
            <img
              className={styles.contact__img}
              src={email_logo}
              alt='Email'></img>
            <span>mihail.treschalin@gmail.com</span>
          </a>
          <a className={styles.contact} href='tg://resolve?domain='>
            <img
              className={styles.contact__img}
              src={telegram_logo}
              alt='Telegram'></img>
            @miket80
          </a>
          <div className={styles.socials}>
            <a
              href='https://github.com/madmike80'
              target='_blank'
              rel='noopener noreferrer'>
              <img
                src={github_logo}
                alt='Github'
                className={styles.social__img}></img>
            </a>
            <a
              href='https://vk.com/mtreschalin'
              target='_blank'
              rel='noopener noreferrer'>
              <img
                src={vk_logo}
                alt='vk-social'
                className={styles.social__img}></img>
            </a>
            <a
              href='www.linkedin.com/in/miket80'
              target='_blank'
              rel='noopener noreferrer'>
              <img
                src={linkedin_logo}
                alt='Linkedin'
                className={styles.social__img}></img>
            </a>
            <a
              href='https://facebook.com/mike.tr80'
              target='_blank'
              rel='noopener noreferrer'>
              <img
                src={facebook_logo}
                alt='Facebook'
                className={styles.social__img}></img>
            </a>
          </div>
        </div>
      </section>
      <RepoList />
    </React.Fragment>
  );
};

export default AboutMe;
