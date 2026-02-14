import React from 'react';
import styles from './Clients.module.css';
import { FINANCIAL_YEARS } from '../../types';
import type { FinancialYear } from '../../types';

interface YearFilterProps {
    selectedYear: FinancialYear;
    onYearChange: (year: FinancialYear) => void;
}

export const YearFilter: React.FC<YearFilterProps> = ({ selectedYear, onYearChange }) => {
    return (
        <select
            className={styles.select}
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value as FinancialYear)}
        >
            {FINANCIAL_YEARS.map(year => (
                <option key={year} value={year}>
                    FY: {year}
                </option>
            ))}
        </select>
    );
};
