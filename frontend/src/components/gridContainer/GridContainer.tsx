import styles from './styles.module.scss';

export default function GridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};