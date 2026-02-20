import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentVerifier } from '../features/premium/DocumentVerifier';
import { FiArrowLeft } from 'react-icons/fi';

export const HasherPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: '0.5rem',
                        borderRadius: '0.375rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = '#0f172a';
                        e.currentTarget.style.background = '#e2e8f0';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = '#64748b';
                        e.currentTarget.style.background = 'none';
                    }}
                >
                    <FiArrowLeft /> Back to Home
                </button>
            </div>
            <DocumentVerifier />
        </div>
    );
};
