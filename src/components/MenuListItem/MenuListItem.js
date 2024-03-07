import React, { useState } from 'react';
import styles from './MenuListItem.module.scss';

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  const [quantity, setQuantity] = useState(1); // start at 1 always

  const handleChange = (event) => {
    const value = event.target.value; // postive values only 
    if (value === '' || (value > 0 && !isNaN(value) && value.indexOf('.') === -1)) {
      setQuantity(parseInt(value));
    }
  };

  return (
    <div className={styles.MenuListItem}>
      <div className={`${styles.emoji} flex-ctr-ctr`}>{menuItem.emoji}</div>
      <div className={styles.name}>{menuItem.name}</div>
      <div className={styles.buy}>
        <span>
          <span className={styles.limegreen}>$</span>
          {menuItem.price.toFixed(2)}
        </span>
        <div className={styles.quantityControl}>
          <button
            className={styles.quantityButton}
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            - 
          </button>
          <input
            className={styles.quantityInput}
            value={quantity}
            onChange={handleChange}
            min="1"
          />
          <button
            className={styles.quantityButton}
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className={styles.btnSm}
          onClick={() => handleAddToOrder(menuItem._id, quantity)}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
