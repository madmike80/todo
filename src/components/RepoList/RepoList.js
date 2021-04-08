import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Octokit } from '@octokit/rest';

import styles from './RepoList.module.css';
import classnames from 'classnames';
import star_img from './img/Star.png';
import fork_img from './img/fork.png';
import error_img from './img/error.png';

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
          isLoading: false,
          incorrectRequest: true,
        });
      });
  }, []);

  return (
    <section
      className={classnames({
        [styles.repo]: true,
        [styles.repo_load]: state.isLoading,
        [styles.repo_error]:
          state.incorrectRequest || state.repoList.length === 0,
      })}>
      {state.isLoading ? (
        <React.Fragment>
          <h2 className={styles.repo__title}>Репозитории на github.com</h2>
          <CircularProgress className={styles.preload} color='primary' />
        </React.Fragment>
      ) : (
        <div>
          {state.incorrectRequest ? (
            <React.Fragment>
              <h2 className={styles.repo__title}>Репозитории на github.com</h2>
              <div className={styles.errWrap}>
                <img src={error_img} alt='Ошибка' />
                <p className={styles.errTitle}>Что-то пошло не так...</p>
                <p className={styles.errSubtitle}>
                  Попробуйте{' '}
                  <a href='' onClick={() => window.location.reload()}>
                    загрузить
                  </a>{' '}
                  ещё раз
                </p>
              </div>
            </React.Fragment>
          ) : (
            <div>
              {state.repoList.length === 0 ? (
                <React.Fragment>
                  <h2 className={styles.repo__title}>
                    Репозитории на github.com
                  </h2>
                  <div className={styles.errWrap}>
                    <img src={error_img} alt='Ошибка' />
                    <p className={styles.errTitle}>Репозитории отсутствуют</p>
                    <p className={styles.errSubtitle}>
                      Добавьте как минимум один репозиторий на{' '}
                      <a
                        href='https://github.com'
                        target='_blank'
                        rel='noopener noreferrer'>
                        github.com
                      </a>
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
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
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default RepoList;
