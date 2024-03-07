import styles from './LineItem.module.scss';

export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
return (
  <div className={styles.LineItem}>
    <div className="flex-ctr-ctr">{lineItem.item.emoji}</div>
    <div className="flex-ctr-ctr flex-col">
      <span className="align-ctr">{lineItem.item.name}</span>
      <span className={styles.limegreen}> $</span>
      <span>{lineItem.item.price.toFixed(2)}</span>
    </div>
    <div className={styles.qty} style={{ justifyContent: isPaid && 'center' }}>
      {!isPaid &&
        <button
          className={styles.button}
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
        >−</button>
      }
        <input
           className={styles.quantityInput}
           value={lineItem.qty}
           onChange={(e) => handleChangeQty(lineItem.item._id, parseInt(e.target.value))}
           min="1"
        />
      {!isPaid &&
        <button
          className={styles.button}
          onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
        >+</button>
      }
    </div>
    <div className={styles.extPrice}><span className={styles.limegreen}>$</span>{lineItem.extPrice.toFixed(2)}</div>
  </div>
);
}