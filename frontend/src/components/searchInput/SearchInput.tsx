import style from './styles.module.scss';

type SearchInputProps = {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  return (
    <div className={style.container}>
      <input
        type="text"
        className={style.input}
        placeholder="Buscar por nome ..."
        onChange={onSearch}
      />
      <button className={style.btn}>
        <span className={style.icon}>🔍</span>
      </button>
    </div>
  );
}
