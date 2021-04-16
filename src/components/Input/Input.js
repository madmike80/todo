import React, { useState } from 'react';

import styles from './Input.module.css';
import classnames from 'classnames';
import addButton from './img/plus.png';

const Input = ({ onClickAdd, items }) => {
  const inputState = {
    inputValue: '',
    error: false,
    helperText: '',
  };
  const [inputValue, setInputValue] = useState(inputState.inputValue);
  const [error, setError] = useState(inputState.error);
  const [helperText, setHelperText] = useState(inputState.helperText);

  const onAddTask = () => {
    if (inputValue.length > 0) {
      if (!items.find((item) => item.value === inputValue)) {
        onClickAdd(inputValue);
        setError(false);
      } else {
        const newHalperText =
          'Такая задача уже есть в вашем списке. Введите другое название';
        setHelperText(newHalperText);
        setError(true);
      }
    } else {
      const newHalperText = 'Поле не должно быть пустым!';
      setHelperText(newHalperText);
      setError(true);
    }
  };

  return (
    <form className={styles.form}>
      <div
        className={classnames({
          [styles.error]: error,
          [styles.error_hide]: !error,
        })}>
        {helperText}
      </div>
      <input
        className={styles.form__text}
        type='text'
        value={inputValue}
        placeholder='Просто введите сюда название дела...'
        onChange={(event) => {
          setInputValue(event.target.value);
          setError(false);
          setHelperText('');
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAddTask();
            setInputValue('');
          }
        }}
      />
      <button className={styles.form__btn}>
        <img
          src={addButton}
          alt='add'
          onClick={(event) => {
            event.preventDefault();
            onAddTask();
            setInputValue('');
          }}
        />
      </button>
    </form>
  );
};

export default Input;
