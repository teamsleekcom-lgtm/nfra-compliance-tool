import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FiArrowLeft } from 'react-icons/fi';
import styles from './TermsPage.module.css';

export const TermsPage: React.FC = () => {
    const [content, setContent] = useState<string>('Loading terms and conditions...');

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);

        // Fetch the markdown file from the public directory
        fetch('/resources/Terms_and_Conditions_NFRA_Tool.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load terms');
                }
                return response.text();
            })
            .then(text => setContent(text))
            .catch(error => {
                console.error('Error loading Terms:', error);
                setContent('Error loading Terms and Conditions. Please try again later.');
            });
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/" className={styles.backButton}>
                    <FiArrowLeft /> Back to Home
                </Link>
            </header>

            <main className={styles.content}>
                <div className={styles.paper}>
                    <div className={styles.markdown}>
                        <ReactMarkdown>
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>
            </main>
        </div>
    );
};
