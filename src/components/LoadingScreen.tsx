import React, { useEffect } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
    onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    useEffect(() => {
        // Enforce a strict 2000ms delay to allow animation to complete
        const timer = setTimeout(() => {
            onComplete();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={styles.container}>
            <div className={styles.spinnerContainer}>
                <svg viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                    <circle cx="40" cy="40" r="32" className={styles.circleBackground} />
                    <circle cx="40" cy="40" r="32" className={styles.circleProgress} />
                </svg>
            </div>
            <div className={styles.text}>Initializing secure workspace...</div>
        </div>
    );
};
