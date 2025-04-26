import style from './styles.module.scss';

export default function SearchInput() {

  return (
    <div className={style.container}>
      <input type="text" className={style.input} placeholder="Buscar por nome ..." />
      <button className={style.btn}>
        <span className={style.icon}>🔍</span>
      </button>
    </div>
  )
}