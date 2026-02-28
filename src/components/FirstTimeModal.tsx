import React, { useState, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import styles from './FirstTimeModal.module.css';
import { Link } from 'react-router-dom';

export const FirstTimeModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = () => {
        if (!acceptedTerms) return;
        localStorage.setItem('hasSeenOnboarding', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>👋 Welcome to NFRA Compliance Tool</h2>
                    <p className={styles.modalSubtitle}>
                        This tool helps CAs prepare ASMs 70% faster with smart templates and auto-complete.
                    </p>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.quickStart}>
                        <h3 className={styles.quickStartTitle}>Quick Start:</h3>
                        <div className={styles.quickStartList}>
                            <div className={styles.quickStartItem}>
                                <div className={styles.stepNumber}>1</div>
                                <span>Click <b>"New Client"</b></span>
                            </div>
                            <div className={styles.quickStartItem}>
                                <div className={styles.stepNumber}>2</div>
                                <span>Fill in basic client details</span>
                            </div>
                            <div className={styles.quickStartItem}>
                                <div className={styles.stepNumber}>3</div>
                                <span>Start filling ASM sections</span>
                            </div>
                            <div className={styles.quickStartItem}>
                                <div className={styles.stepNumber}>4</div>
                                <span>Export to DOCX when done</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.advisory}>
                        <FiAlertTriangle className={styles.advisoryIcon} />
                        <div>
                            <div className={styles.advisoryTitle}>⚠️ DATA STORAGE ADVISORY:</div>
                            <div className={styles.advisoryContent}>
                                All data stored in your browser locally. Export regularly to prevent loss.
                            </div>
                        </div>
                    </div>

                    <label className={styles.termsCheckbox}>
                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        <span>
                            I understand and accept <Link to="/terms" target="_blank" className={styles.termsLink}>Terms</Link>
                        </span>
                    </label>
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.btnStart} disabled={!acceptedTerms} onClick={handleClose}>
                        Skip to Tool
                    </button>
                </div>
            </div>
        </div>
    );
};
