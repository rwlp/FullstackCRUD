import React, { useState } from 'react';
import style from './styles.module.scss'; // ajuste conforme necessário

type SearchInputProps = {
  onSearch: (e: string) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={style.container}>
      <input
        value={inputValue}
        type="text"
        className={style.input}
        placeholder="Buscar por nome ..."
        onChange={handleChangeInput}
      />
      <button
       className={style.btn}
       onClick={() => onSearch(inputValue)}>
        <span className={style.icon}>🔍</span>
      </button>
    </div>
  );
}
