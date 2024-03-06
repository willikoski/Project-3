import styles from './Logo.module.scss';

export default function Logo() {
return (
<div className={`${styles.Logo} ${styles['anton-regular']}`}>
      <div>Coder</div>
      <div>For Rent</div>
    </div>
);
}