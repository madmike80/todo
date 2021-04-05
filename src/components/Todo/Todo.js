import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
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

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const newItemList = [...items];

    const [deletedItem] = newItemList.splice(source.index, 1);
    newItemList.splice(destination.index, 0, deletedItem);

    setItems([...newItemList]);
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
    <section className={styles.content}>
      <header className={styles.todoHeader}>
        <h1 className={styles.todoHeader__title}>Список моих дел</h1>
        <Filter filter={filter} items={items} onClickFilter={onClickFilter} />
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ItemList
          items={filteredTaskList}
          filter={filter}
          onClickDone={onClickDone}
          onClickDel={onClickDel}
        />
      </DragDropContext>
      <Input onClickAdd={onClickAdd} />
    </section>
  );
};

export default Todo;
