import React, { useState } from 'react';
import styles from './ItemList.module.css';

import Item from '../Item/Item';

const ItemList = ({ items, onClickDone }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <Item
        value={item.value}
        isDone={item.isDone}
        id={item.id}
        key={item.id}
        onClickDone={onClickDone}
        // onClickDelete={onClickDelete}
      />
    ))}
  </ul>
);

export default ItemList;
