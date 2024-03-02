import { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Logo from '../../components/Logo/Logo';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className={styles.AuthPage}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.credentialsContainer}>
        {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      </div>
      <h3 className={styles.switchButton} onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'SIGN UP' : 'LOG IN'}
      </h3>
    </main>
  );
}