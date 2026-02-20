import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit3, FiLock, FiCloud, FiFileText, FiX } from 'react-icons/fi';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isCircularsOpen, setIsCircularsOpen] = useState(false);

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
                            <button onClick={() => setIsCircularsOpen(true)} className={styles.resourceLink} style={{ background: '#f1f5f9', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                                <FiFileText /> NFRA Circulars
                            </button>
                            <a href="/resources/asm/ASM Audit Stretagy Memorandum file.pdf" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
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
                    <a href="/terms" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Terms & Conditions</a>
                    <a href="#" className={styles.footerLink} onClick={(e) => e.preventDefault()}>Disclaimer</a>
                </div>
            </footer>

            {/* Circulars Modal */}
            {isCircularsOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsCircularsOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>NFRA Circulars</h3>
                            <button className={styles.closeButton} onClick={() => setIsCircularsOpen(false)}>
                                <FiX />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <a href="/resources/nfra-circulars/NFRA Circular Non Compliance with Ind AS policies on Revenue.pdf" target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                                <FiFileText className={styles.modalLinkIcon} />
                                <span className={styles.modalLinkText}>Non Compliance with Ind AS policies on Revenue</span>
                            </a>
                            <a href="/resources/nfra-circulars/NFRA Circular on Effective Communication Between Statutory Auditors and Those Charged with Governance, Including Audit Committees.pdf" target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                                <FiFileText className={styles.modalLinkIcon} />
                                <span className={styles.modalLinkText}>Effective Communication Between Statutory Auditors and Those Charged with Governance</span>
                            </a>
                            <a href="/resources/nfra-circulars/NFRA Circular on Maintenance, archival and submission of Audit File to NFRA..pdf" target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                                <FiFileText className={styles.modalLinkIcon} />
                                <span className={styles.modalLinkText}>Maintenance, Archival and Submission of Audit File to NFRA</span>
                            </a>
                            <a href="/resources/nfra-circulars/NFRA circular on Statutory Auditors’ responsibilities in relation to Fraud in a Company.pdf" target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                                <FiFileText className={styles.modalLinkIcon} />
                                <span className={styles.modalLinkText}>Statutory Auditors’ Responsibilities in relation to Fraud in a Company</span>
                            </a>
                            <a href="/resources/nfra-circulars/NFRA Circular on Non-Accrual of interest on borrowings by the companies in violation of Indian Accounting Standards.pdf" target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                                <FiFileText className={styles.modalLinkIcon} />
                                <span className={styles.modalLinkText}>Non-Accrual of Interest on Borrowings in Violation of Ind AS</span>
                            </a>
                            <a href="/resources/nfra-circulars/NFRA Circular on Responsibilities of Principal Auditor and Other Auditors in Group Audits.pdf" target="_blank" rel="noopener noreferrer" className={styles.modalLink}>
                                <FiFileText className={styles.modalLinkIcon} />
                                <span className={styles.modalLinkText}>Responsibilities of Principal Auditor and Other Auditors in Group Audits</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
