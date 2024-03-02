import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import styles from './LoginForm.module.scss'; 

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      <div className={styles.formContainer}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className={styles.label}>Email</label><br/>
          <input className={styles.input} type="text" name="email" value={credentials.email} onChange={handleChange} required /><br/>
          <label className={styles.label}>Password</label><br/>
          <input className={styles.input} type="password" name="password" value={credentials.password} onChange={handleChange} required /><br/>
          <button className={styles.button} type="submit">LOG IN</button><br/>
        </form>
      </div>
      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
}