import React, { useState, useEffect } from 'react';

import styles from './Todo.module.css';
import Filter from '../Filter/Filter';
import ItemList from '../ItemList/ItemList';
import Input from '../Input/Input';

const Todo = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  let [filter, setFilter] = useState('all');

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

  const handleRadioChange = (Event) => {
    filter = Event.target.value;
    setFilter(filter);
  };

  return (
    <section className={styles.content}>
      <header className={styles.todoHeader}>
        <h1 className={styles.todoHeader__title}>Список моих дел</h1>
        <Filter
          filter={filter}
          items={items}
          handleRadioChange={handleRadioChange}
        />
      </header>
      <ItemList items={items} filter={filter} onClickDone={onClickDone} />
      <Input onClickAdd={onClickAdd} />
    </section>
  );
};

export default Todo;
