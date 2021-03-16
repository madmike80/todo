import React, { useState } from 'react';

import styles from './Input.module.css';
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

  const onAddTasck = () => {
    if (inputValue.length > 0) {
      const newInputValue = '';
      setInputValue(newInputValue);
      onClickAdd(inputValue);
    } else {
      const newHalperText = 'Поле не должно быть пустым!';
      const newError = true;
      setHelperText(newHalperText);
      setError(newError);
    }
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.form__text}
        type='text'
        value={inputValue}
        placeholder='Просто введите сюда название дела...'
        onChange={(event) => {
          setInputValue(event.target.value);
          setHelperText('');
          setError(false);
        }}
      />
      <button className={styles.form__btn}>
        <img src={addButton} alt='add' onClick={onAddTasck} />
      </button>
    </form>
  );
};

export default Input;
