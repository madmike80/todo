import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Octokit } from '@octokit/rest';

import styles from './RepoList.module.css';
import classnames from 'classnames';
import star_img from './img/Star.png';
import fork_img from './img/fork.png';
const octokit = new Octokit();

const RepoList = () => {
  const [state, setState] = useState({
    username: 'madmike80',
    isLoading: true,
    repoList: [],
    incorrectRequest: false,
  });

  useEffect(() => {
    octokit.repos
      .listForUser({
        username: state.username,
      })
      .then(({ data }) => {
        setState({
          isLoading: false,
          repoList: data,
        });
      })
      .catch(() => {
        setState({
          incorrectRequest: true,
        });
      });
  }, []);
  return (
    <section className={styles.repo}>
      <h2 className={styles.repo__title}>Репозитории на github.com</h2>
      <ul className={styles.repo__list}>
        {state.repoList.map((repo) => (
          <li className={styles.repo__item} key={repo.id}>
            <a className={styles.repo__link} href={repo.html_url}>
              {repo.name}
            </a>
            <div className={styles.repo__infoWrap}>
              <p className={styles.repo__info}>{repo.language}</p>
              <p className={styles.repo__info}>
                <img src={star_img} alt='Star' />
                {repo.stargazers_count}
              </p>
              <p className={styles.repo__info}>
                <img src={fork_img} alt='Forks' />
                {repo.forks_count}
              </p>
              <p className={styles.repo__info}>
                Updated on{' '}
                {new Date(repo.updated_at).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RepoList;
