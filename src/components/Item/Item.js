import React, { useState } from 'react';
import classnames from 'classnames';

import styles from './Item.module.css';
import delButton from './img/del.png';

const Item = ({ value, isDone, onClickDone, id, filter }) => (
  <li
    className={classnames({
      [styles.item]: true,
      [styles.done]: isDone,
      [styles.hide]:
        (filter === 'done' && !isDone) || (filter === 'active' && isDone)
          ? true
          : false,
    })}>
    <label className={styles.item__value}>
      <input
        className={styles.item__check}
        type='checkbox'
        checked={isDone}
        onChange={() => onClickDone(id)}
      />
      <span>{value}</span>
    </label>
    <button className={styles.item__delBtn}>
      <img src={delButton} alt='delete' />
    </button>
  </li>
);

export default Item;
