import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';

import styles from './Item.module.css';
import delButton from './img/del.png';

const Item = ({ value, isDone, onClickDone, id, onClickDel, index }) => (
  <Draggable className={styles.dragItem} draggableId={id} index={index}>
    {(provided, snapshot) => (
      <li
        className={classnames({
          [styles.item]: true,
          [styles.done]: isDone,
          [styles.dragging]: snapshot.isDragging,
        })}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        <label className={styles.item__value}>
          <input
            className={styles.item__check}
            type='checkbox'
            checked={isDone}
            onChange={() => onClickDone(id)}
          />
          <span>{value}</span>
        </label>
        <button className={styles.item__delBtn} onClick={() => onClickDel(id)}>
          <img src={delButton} alt='delete' />
        </button>
      </li>
    )}
  </Draggable>
);

export default Item;
