import React, { useState } from 'react';

import styles from './Input.module.css';
import classnames from 'classnames';
import addButton from './img/plus.png';

const Input = ({ onClickAdd }) => {
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
      // const newInputValue = '';
      // setInputValue(newInputValue);
      onClickAdd(inputValue);
    } else {
      const newHalperText = 'Поле не должно быть пустым!';
      // const newError = true;
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
          setHelperText('');
        }}
      />
      <button className={styles.form__btn}>
        <img src={addButton} alt='add' onClick={onAddTask} />
      </button>
    </form>
  );
};

export default Input;
