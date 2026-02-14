import React, { useState } from 'react';
import { calculateFileHash } from '../../services/crypto';

import { v4 as uuidv4 } from 'uuid';
import { initDB } from '../../services/db';

export const DocumentVerifier: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [hash, setHash] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'calculating' | 'success' | 'mismatch' | 'not-found'>('idle');
    const [savedHash, setSavedHash] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setStatus('calculating');
            setHash('');
            setSavedHash(null);

            try {
                const calculatedHash = await calculateFileHash(selectedFile);
                setHash(calculatedHash);

                // Check if hash exists in DB
                const db = await initDB();
                const allHashes = await db.getAll('external_hashes');
                // Check for exact hash match primarily, or name match to warn about changes
                // Let's find by name first to see if we have a previous version
                const matchByName = allHashes.find(h => h.name === selectedFile.name);

                if (matchByName) {
                    setSavedHash(matchByName.hash);
                    if (matchByName.hash === calculatedHash) {
                        setStatus('success');
                    } else {
                        setStatus('mismatch');
                    }
                } else {
                    // Check if this hash exists under ANY name?
                    const matchByHash = allHashes.find(h => h.hash === calculatedHash);
                    if (matchByHash) {
                        setStatus('success');
                        setSavedHash(matchByHash.hash); // It matches
                    } else {
                        setStatus('not-found');
                    }
                }
            } catch (err) {
                console.error(err);
                setStatus('idle');
            }
        }
    };

    const handleSaveHash = async () => {
        if (!file || !hash) return;
        const db = await initDB();
        await db.put('external_hashes', {
            id: uuidv4(),
            name: file.name,
            hash: hash,
            timestamp: Date.now()
        });
        setStatus('success');
        setSavedHash(hash);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>Document Integrity Verifier</h2>
                <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Upload any document (PDF, DOCX, XLSX) to generate a secure SHA-256 hash.
                    This hash acts as a digital fingerprint to verify that the file has not been altered since it was last secured.
                </p>

                <div style={{ padding: '20px', border: '2px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center', marginBottom: '2rem', background: '#f8fafc' }}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>📄</div>
                        <div style={{ fontWeight: '500', color: '#0f172a' }}>Click to Select Document</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>or drag and drop here</div>
                    </label>
                    {file && <div style={{ marginTop: '10px', fontWeight: '500', color: '#0f172a' }}>Selected: {file.name}</div>}
                </div>

                {status === 'calculating' && <div style={{ textAlign: 'center', color: '#64748b' }}>Generating cryptographic hash...</div>}

                {hash && (
                    <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', marginBottom: '4px', letterSpacing: '0.05em' }}>SHA-256 Fingerprint</div>
                        <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#0f172a', wordBreak: 'break-all' }}>{hash}</div>
                    </div>
                )}

                {status === 'not-found' && (
                    <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', padding: '1rem', borderRadius: '6px', color: '#92400e' }}>
                        <strong>New Document Detected</strong>
                        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>This document's hash is not in our secure registry.</p>
                        <button
                            onClick={handleSaveHash}
                            style={{ padding: '8px 16px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
                        >
                            Securely Register Hash
                        </button>
                    </div>
                )}

                {status === 'success' && (
                    <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '1rem', borderRadius: '6px', color: '#166534' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '600' }}>
                            <span>✅</span> Verified Authentic
                        </div>
                        <p style={{ margin: '8px 0 0', fontSize: '0.9rem' }}>This document matches the secure record.</p>
                    </div>
                )}

                {status === 'mismatch' && (
                    <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', padding: '1rem', borderRadius: '6px', color: '#991b1b' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: '600' }}>
                            <span>⚠️</span> Integrity Warning
                        </div>
                        <p style={{ margin: '8px 0', fontSize: '0.9rem' }}>This document has been modified since it was secured.</p>
                        <div style={{ fontSize: '0.75rem', marginTop: '8px', padding: '8px', background: 'white', borderRadius: '4px', border: '1px solid #fecaca' }}>
                            <div><strong>Original Hash:</strong> {savedHash}</div>
                            <div><strong>Current Hash:</strong> {hash}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
