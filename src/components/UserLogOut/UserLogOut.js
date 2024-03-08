import React, { useState, useEffect } from 'react';
import styles from './UserLogOut.module.scss';
import { logOut } from '../../utilities/users-service';

export default function UserLogOut({ user, setUser, balance }) {
  const [userBalance, setUserBalance] = useState(balance);

  useEffect(() => {
    setUserBalance(balance);
  }, [balance]);

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className={styles.UserLogOut}>
      <div>{user.name}</div>
      <div className={styles.email}>{user.email}</div>
      {userBalance && <div>Balance: <span className={styles.limegreen}>$</span>{userBalance}</div>}
      <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
}