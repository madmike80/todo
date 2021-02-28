import React, { useState, useEffect } from 'react';

import styles from './Todo.module.css';

import Input from '../Input/Input';
import ItemList from '../ItemList/ItemList';

const Todo = () => {
  const appState = {
    items: JSON.parse(localStorage.getItem('items')) || [],
  };

  const [items, setItems] = useState(appState.items);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  });

  const onClickAdd = (value) => {
    const newTask = [
      ...items,
      {
        value,
        isDone: false,
        id: Date.now(),
      },
    ];
    setItems(newTask);
  };

  const onClickDone = (id) => {
    const newItemList = items.map((item) => {
      const newItem = { ...item };

      if (newItem.id === id) {
        newItem.isDone = !newItem.isDone;
      }

      return newItem;
    });

    setItems(newItemList);
  };

  return (
    <section className={styles.content}>
      <ItemList items={items} onClickDone={onClickDone} />
      <Input onClickAdd={onClickAdd} />
    </section>
  );
};

export default Todo;
