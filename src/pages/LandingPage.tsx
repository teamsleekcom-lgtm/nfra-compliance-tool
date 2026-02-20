import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiLock, FiCloud, FiFileText } from 'react-icons/fi';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <main className={styles.main}>

                {/* Left Side: Hero */}
                <div className={styles.hero}>
                    <h1 className={styles.title}>NFRA Compliance Suite</h1>
                    <p className={styles.subtitle}>
                        All NFRA compliance requirements at one place. A secure, structured, and professional platform designed for Chartered Accountants to manage audit documentation effortlessly.
                    </p>
                </div>

                {/* Right Side: Navigation Actions */}
                <div className={styles.actions}>

                    <div
                        className={styles.actionCard}
                        onClick={() => navigate('/asm')}
                        role="button"
                        tabIndex={0}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.iconContainer}><FiEdit3 /></div>
                            <span className={styles.cardTitle}>Audit Strategy Memorandum</span>
                        </div>
                        <div className={styles.cardDesc}>
                            Draft, review, and manage your ASM with our intelligent checklist and document editor.
                        </div>
                    </div>

                    <div
                        className={styles.actionCard}
                        onClick={() => navigate('/hasher')}
                        role="button"
                        tabIndex={0}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.iconContainer}><FiLock /></div>
                            <span className={styles.cardTitle}>Lock Audit File with Hash</span>
                        </div>
                        <div className={styles.cardDesc}>
                            Generate cryptographic SHA-256 hashes to secure and verify your final audit documents.
                        </div>
                    </div>

                    <div
                        className={styles.actionCard}
                        onClick={() => window.open('#', '_blank')}
                        role="button"
                        tabIndex={0}
                        style={{ opacity: 0.8 }}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.iconContainer}><FiCloud /></div>
                            <span className={styles.cardTitle}>Move to Cloud (Beta)</span>
                        </div>
                        <div className={styles.cardDesc}>
                            Transition your entire audit workspace to our upcoming cloud platform. Co-author and manage team access.
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className={styles.resources}>
                        <div className={styles.resourcesTitle}>Official Resources</div>
                        <div className={styles.resourceLinks}>
                            <a href="#" className={styles.resourceLink} onClick={(e) => e.preventDefault()}>
                                <FiFileText /> NFRA Circulars
                            </a>
                            <a href="#" className={styles.resourceLink} onClick={(e) => e.preventDefault()}>
                                <FiFileText /> ASM Draft by NFRA
                            </a>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div>&copy; {new Date().getFullYear()} NFRA Compliance Tool. All rights reserved.</div>
                <div className={styles.footerLinks}>
                    <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
                    <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Disclaimer</a>
                </div>
            </footer>
        </div>
    );
};
