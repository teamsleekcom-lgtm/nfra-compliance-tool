import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiArrowRight, FiCheckCircle, FiClock, FiShield,
    FiFileText, FiList, FiSave, FiDownload, FiX,
    FiZap, FiLock, FiStar, FiEdit3
} from 'react-icons/fi';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isCircularsOpen, setIsCircularsOpen] = useState(false);

    const scrollToFeatures = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToHowItWorks = (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>

            {/* Header Navigation */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <FiShield className={styles.logoIcon} />
                    NFRA Compliance Tools
                </div>
                <nav className={styles.navLinks}>
                    <a href="#features" onClick={scrollToFeatures} className={styles.navLink}>Features</a>
                    <a href="#how-it-works" onClick={scrollToHowItWorks} className={styles.navLink}>How It Works</a>
                    <a href="#faq" className={styles.navLink} onClick={(e) => { e.preventDefault(); alert("FAQ coming soon!"); }}>FAQ</a>
                    <button onClick={() => navigate('/asm')} className={styles.btnPrimary} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                        Get Started &rarr;
                    </button>
                </nav>
            </header>

            <main>
                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <div className={styles.badge}>
                        <FiStar className={styles.stars} />
                        Trusted by 500+ CAs across India
                    </div>

                    <h1 className={styles.heroTitle}>
                        Free ASM Preparation Tool for NFRA-Compliant Audits
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Cut documentation time by 70% with smart templates and auto-complete.
                    </p>

                    <div className={styles.heroBullets}>
                        <div className={styles.heroBullet}><FiCheckCircle className={styles.bulletIcon} /> Save 18+ hours per engagement</div>
                        <div className={styles.heroBullet}><FiCheckCircle className={styles.bulletIcon} /> Never miss compliance deadlines</div>
                        <div className={styles.heroBullet}><FiCheckCircle className={styles.bulletIcon} /> 100% FREE forever—no credit card</div>
                    </div>

                    <div className={styles.heroActions}>
                        <button onClick={() => navigate('/asm')} className={styles.btnPrimary}>
                            Get Started Free <FiArrowRight />
                        </button>
                    </div>
                    <div className={styles.trustText}>
                        <FiLock /> Bank-level security (Data never leaves your browser)
                    </div>
                </section>

                {/* Problem Section */}
                <section className={styles.problemSection}>
                    <div className={styles.problemContainer}>
                        <h2 className={styles.problemTitle}>Drowning in NFRA Documentation? You're Not Alone.</h2>

                        <div className={styles.problemList}>
                            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: '#94a3b8' }}>Every CA auditing NFRA-covered entities faces:</p>

                            <div className={styles.problemItem}>
                                <span className={styles.emoji}>😤</span>
                                <span>A LOT of hours spent on ASM documentation</span>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.emoji}>😤</span>
                                <span>Typing the same information 100+ times</span>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.emoji}>😤</span>
                                <span>Manually tracking deadlines in spreadsheets</span>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.emoji}>😤</span>
                                <span>No way to prove documents remained unchanged</span>
                            </div>
                            <div className={styles.problemItem}>
                                <span className={styles.emoji}>😤</span>
                                <span>Formatting nightmares in Word/Excel</span>
                            </div>
                        </div>

                        <p className={styles.problemConclusion}>
                            All this busywork takes time away from actual audit work—the work that adds real value.<br />
                            <strong>Until now. &darr;</strong>
                        </p>
                    </div>
                </section>

                {/* Solution Section (How It Works) */}
                <section id="how-it-works" className={styles.solutionSection}>
                    <h2 className={styles.sectionTitle}>How It Works (3 Simple Steps)</h2>

                    <div className={styles.stepsContainer}>
                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>1</div>
                            <h3 className={styles.stepTitle}>Start With Template</h3>
                            <p className={styles.stepDesc}>
                                Pre-loaded 11-section NFRA-compliant ASM. No more blank page syndrome.
                            </p>
                        </div>

                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>2</div>
                            <h3 className={styles.stepTitle}>Type Once, Use Everywhere</h3>
                            <p className={styles.stepDesc}>
                                Enter a partner name once &rarr; auto-fills in 47 places. Smart variables eliminate repetitive typing.
                            </p>
                        </div>

                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>3</div>
                            <h3 className={styles.stepTitle}>Never Miss A Deadline</h3>
                            <p className={styles.stepDesc}>
                                60-day countdown + 7-year retention tracking. Automated alerts keep you compliant securely.
                            </p>
                        </div>
                    </div>

                    <div className={styles.solutionResult}>
                        <div className={styles.resultHighlight}>RESULT: 24+ hours &rarr; 1-2 hours</div>
                        <br />
                        <button onClick={() => navigate('/asm')} className={styles.btnPrimary}>
                            Get Started Free <FiArrowRight />
                        </button>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className={styles.featuresSection}>
                    <h2 className={styles.sectionTitle}>Everything You Need for NFRA-Ready ASMs</h2>

                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <FiZap className={styles.featureIcon} style={{ color: '#eab308' }} />
                            <h3 className={styles.featureTitle}>90% Faster</h3>
                            <p className={styles.featureDesc}>Cut prep time from 24+ hours to 1-2 hours.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <FiCheckCircle className={styles.featureIcon} style={{ color: '#10b981' }} />
                            <h3 className={styles.featureTitle}>100% Free</h3>
                            <p className={styles.featureDesc}>All features included. No premium tiers to unlock basic needs.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <FiShield className={styles.featureIcon} style={{ color: '#6366f1' }} />
                            <h3 className={styles.featureTitle}>Private by Design</h3>
                            <p className={styles.featureDesc}>Data stays stored locally on your computer. Full privacy.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <FiEdit3 className={styles.featureIcon} style={{ color: '#3b82f6' }} />
                            <h3 className={styles.featureTitle}>Smart Forms</h3>
                            <p className={styles.featureDesc}>Type once, auto-fills everywhere. Saves hundreds of keystrokes.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <FiClock className={styles.featureIcon} style={{ color: '#ef4444' }} />
                            <h3 className={styles.featureTitle}>Deadlines Tracker</h3>
                            <p className={styles.featureDesc}>Never miss 60-day or 7-year compliance windows.</p>
                        </div>

                        <div className={styles.featureCard} style={{ cursor: 'pointer' }} onClick={() => navigate('/hasher')}>
                            <FiLock className={styles.featureIcon} style={{ color: '#8b5cf6' }} />
                            <h3 className={styles.featureTitle}>Document Hashing</h3>
                            <p className={styles.featureDesc}>SHA-256 locks prove no tampering for NFRA regulators. <span style={{ color: '#8b5cf6', textDecoration: 'underline' }}>Try it now</span></p>
                        </div>

                        <div className={styles.featureCard}>
                            <FiList className={styles.featureIcon} style={{ color: '#06b6d4' }} />
                            <h3 className={styles.featureTitle}>11 Sections</h3>
                            <p className={styles.featureDesc}>Complete NFRA-compliant templates ready to fill immediately.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <FiSave className={styles.featureIcon} style={{ color: '#14b8a6' }} />
                            <h3 className={styles.featureTitle}>Auto-Save</h3>
                            <p className={styles.featureDesc}>Never lose your work. Continuous background saving (30s intervals).</p>
                        </div>

                        <div className={styles.featureCard}>
                            <FiDownload className={styles.featureIcon} style={{ color: '#f97316' }} />
                            <h3 className={styles.featureTitle}>Instant Export</h3>
                            <p className={styles.featureDesc}>Download to professional DOCX format in a single click.</p>
                        </div>
                    </div>
                </section>

                {/* Before / After Comparison */}
                <section className={styles.comparisonSection}>
                    <h2 className={styles.sectionTitle}>The Difference is Clear</h2>

                    <div className={styles.comparisonContainer}>
                        {/* Before */}
                        <div className={`${styles.compCol} ${styles.compColBad}`}>
                            <div className={`${styles.compHeader} ${styles.compBadHeader}`}>Without NFRA Tool</div>
                            <div className={styles.compTime}>⏱️ 24+ HOURS</div>
                            <div className={styles.compList}>
                                <div className={styles.compItem}>❌ Blank Word document</div>
                                <div className={styles.compItem}>❌ Copy-pasting old ASMs</div>
                                <div className={styles.compItem}>❌ Type info 100+ times</div>
                                <div className={styles.compItem}>❌ Manual formatting</div>
                                <div className={styles.compItem}>❌ Manual deadlines tracking</div>
                                <div className={styles.compItem}>❌ No mathematical document proof</div>
                            </div>
                            <div className={styles.compConclusion} style={{ color: '#991b1b' }}>🤯 Exhausting</div>
                        </div>

                        {/* After */}
                        <div className={`${styles.compCol} ${styles.compColGood}`}>
                            <div className={`${styles.compHeader} ${styles.compGoodHeader}`}>With NFRA Tool</div>
                            <div className={styles.compTime}>⏱️ 1-2 HOURS</div>
                            <div className={styles.compList}>
                                <div className={styles.compItem}>✅ Pre-loaded template</div>
                                <div className={styles.compItem}>✅ Smart forms ready</div>
                                <div className={styles.compItem}>✅ Type once, use all</div>
                                <div className={styles.compItem}>✅ Perfect formatting out-of-box</div>
                                <div className={styles.compItem}>✅ Auto deadline tracking</div>
                                <div className={styles.compItem}>✅ SHA-256 verification included</div>
                            </div>
                            <div className={styles.compConclusion} style={{ color: '#166534' }}>😊 Effortless</div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className={styles.finalCtaSection}>
                    <div className={styles.finalCtaBox}>
                        <h2 className={styles.finalTitle}>Ready to Save 18+ Hours on Your Next ASM?</h2>
                        <p className={styles.finalSubtitle}>Join 500+ CAs who've made the switch.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}><FiCheckCircle color="#10b981" /> No credit card required</div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}><FiCheckCircle color="#10b981" /> No download or installation</div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}><FiCheckCircle color="#10b981" /> Free forever—all features</div>
                        </div>

                        <button onClick={() => navigate('/asm')} className={styles.btnPrimary} style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}>
                            Get Started Free &rarr;
                        </button>

                        <div className={styles.finalSecurity}>
                            <FiLock /> Bank-level security | 🇮🇳 Made in India
                        </div>
                    </div>
                </section>
            </main>

            {/* Structured Footer */}
            <footer className={styles.mainFooter}>
                <div className={styles.footerGrid}>
                    <div className={styles.footerCol}>
                        <h4>PRODUCT</h4>
                        <div className={styles.footerLinks}>
                            <a href="#features" onClick={scrollToFeatures} className={styles.footerLink}>Features</a>
                            <a href="#how-it-works" onClick={scrollToHowItWorks} className={styles.footerLink}>How It Works</a>
                            <button onClick={() => setIsCircularsOpen(true)} className={styles.footerLink} style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}>NFRA Circulars</button>
                            <a href="/resources/asm/ASM Audit Stretagy Memorandum file.pdf" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>ASM Draft by NFRA</a>
                            <span className={styles.footerLink}>Pricing (Free)</span>
                        </div>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>COMPANY</h4>
                        <div className={styles.footerLinks}>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>About Us</span>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>Contact</span>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>Blog</span>
                        </div>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>LEGAL</h4>
                        <div className={styles.footerLinks}>
                            <a href="#/terms" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Terms & Conditions</a>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>Privacy Policy</span>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>Cookies Policy</span>
                        </div>
                    </div>

                    <div className={styles.footerCol}>
                        <h4>SUPPORT</h4>
                        <div className={styles.footerLinks}>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>FAQ</span>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>Help Center</span>
                            <span className={styles.footerLink} style={{ cursor: 'not-allowed' }}>Video Guides</span>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div>
                        © {new Date().getFullYear()} Heuristic Techsol LLP. Made with ❤️ for Indian CAs.<br />
                        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Not affiliated with NFRA / ICAI / MCA.</span>
                    </div>

                    <div className={styles.footerContact}>
                        <span>📧 support@nfratools.in</span>
                        <span>📍 Ahmedabad, Gujarat</span>
                    </div>
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
