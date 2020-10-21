import styles from './button.module.css';

function Button({ type, onClick, label }) {
  return (
    <div className={styles.container} onClick={onClick} type={type}>
      {label}
    </div>
  );
}

export default Button;
