import React from 'react';
import styles from './CustomerSupport.module.scss';

const CustomerSupportBubble = () => {
    const handleClick = () => {
        // Open the YouTube link in a new tab when the bubble is clicked
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    };

    return (
        <div className={styles["customer-support-container"]} onClick={handleClick}>
            <div className={styles["customer-support-bubble"]}>
                <span className={styles["customer-support-icon-wrapper"]}>
                    <span className={styles["customer-support-icon"]}>?</span>
                </span>
                <div className={styles["customer-support-text"]}>
                    <p>Welcome to our site!</p>
                    <p>Need help?</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerSupportBubble;
