import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/product" className={styles.link}>Filtros</Link>
        <Link to="/product/0" className={styles.link}>Adicionar</Link>
      </nav>
    </header>
  );
};
