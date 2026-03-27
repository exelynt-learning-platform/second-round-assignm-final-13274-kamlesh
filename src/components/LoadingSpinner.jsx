import React from 'react';
import { FaRobot } from 'react-icons/fa';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => (
    <div className={styles.spinnerContainer}>
        <div className={styles.avatar}>
            <FaRobot size={20} color="#fff" />
        </div>
        <div className={styles.dotsWrapper}>
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
        </div>

    </div>
);

export default LoadingSpinner;