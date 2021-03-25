import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './Filter.module.css';

const Filter = ({ items, filter, onClickFilter }) => {
  let doneTask = items.filter((item) => item.isDone).length;
  let activeTask = items.filter((item) => !item.isDone).length;
  return (
    <div className={styles.filter}>
      <label
        className={classnames({
          [styles.filter__item]: true,
          [styles.filter__item_active]: filter === 'done',
        })}>
        <input
          className={styles.filter__check}
          type='radio'
          name='filter'
          value='done'
          onClick={onClickFilter}></input>
        Завершенные
        <span className={styles.count}>{doneTask}</span>
      </label>
      <label
        className={classnames({
          [styles.filter__item]: true,
          [styles.filter__item_active]: filter === 'active',
        })}>
        <input
          className={styles.filter__check}
          type='radio'
          name='filter'
          value='active'
          onClick={onClickFilter}></input>
        Незавершенные
        <span className={styles.count}>{activeTask}</span>
      </label>
      <label
        className={classnames({
          [styles.filter__item]: true,
          [styles.filter__item_active]: filter === 'all',
        })}>
        <input
          className={styles.filter__check}
          type='radio'
          name='filter'
          value='all'
          onClick={onClickFilter}></input>
        Все
      </label>
    </div>
  );
};

export default Filter;
