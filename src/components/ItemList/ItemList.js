import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import styles from './ItemList.module.css';
import emptyList from './img/empty-list_bg.png';
import Item from '../Item/Item';

const ItemList = ({ items, onClickDone, filter, onClickDel }) => {
  return (
    <React.Fragment>
      {items.length > 0 ? (
        <Droppable>
          <ul className={styles.list}>
            {items.map((item) => (
              <Item
                value={item.value}
                isDone={item.isDone}
                filter={filter}
                id={item.id}
                key={item.id}
                onClickDone={onClickDone}
                onClickDel={onClickDel}
              />
            ))}
          </ul>
        </Droppable>
      ) : (
        <div className={styles.noCase}>
          <img
            className={styles.noCase__img}
            src={emptyList}
            alt='empty list'
          />
          <p className={styles.noCase__title}>
            Вы ещё не добавили ни одной задачи
          </p>
          <p className={styles.noCase__subtitle}>Сделайте это прямо сейчас!</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemList;
