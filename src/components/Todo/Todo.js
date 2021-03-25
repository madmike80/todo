import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v1 as uuidv1 } from 'uuid';

import styles from './Todo.module.css';
import Filter from '../Filter/Filter';
import ItemList from '../ItemList/ItemList';
import Input from '../Input/Input';

const Todo = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  let [filter, setFilter] = useState('active');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  });

  const onClickAdd = (value) => {
    const newTask = [
      ...items,
      {
        value,
        isDone: false,
        id: uuidv1(),
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

  const onClickDel = (id) => {
    const newItemList = items.filter((item) => {
      const newItem = { ...item };
      if (item.id !== id) {
        return newItem;
      }
    });
    setItems(newItemList);
  };

  const onClickFilter = (Event) => {
    filter = Event.target.value;
    setFilter(filter);
  };

  let filteredTaskList = [];
  switch (filter) {
    case 'all':
      filteredTaskList = items;
      break;
    case 'done':
      filteredTaskList = items.filter((item) => item.isDone);
      break;
    case 'active':
      filteredTaskList = items.filter((item) => !item.isDone);
      break;
    default:
      filteredTaskList = items;
  }

  return (
    <DragDropContext>
      <section className={styles.content}>
        <header className={styles.todoHeader}>
          <h1 className={styles.todoHeader__title}>Список моих дел</h1>
          <Filter filter={filter} items={items} onClickFilter={onClickFilter} />
        </header>

        <ItemList
          items={filteredTaskList}
          filter={filter}
          onClickDone={onClickDone}
          onClickDel={onClickDel}
        />

        <Input onClickAdd={onClickAdd} />
      </section>
    </DragDropContext>
  );
};

export default Todo;
