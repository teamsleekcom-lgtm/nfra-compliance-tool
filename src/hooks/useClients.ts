import { useState, useEffect } from 'react';
import { clientService } from '../services/db';
import type { Client, FinancialYear } from '../types';

export const useClients = (selectedYear: FinancialYear) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadClients();
    }, [selectedYear]);

    const loadClients = async () => {
        setLoading(true);
        // Ensure DB is init
        try {
            const allClients = await clientService.getAllClients();
            setClients(allClients.filter(c => c.financialYear === selectedYear));
        } catch (error) {
            console.error("Failed to load clients", error);
        } finally {
            setLoading(false);
        }
    };

    const addClient = async (clientData: Omit<Client, 'id'>) => {
        try {
            await clientService.addClient(clientData);
            await loadClients();
        } catch (error) {
            console.error("Failed to add client", error);
        }
    };

    return { clients, loading, refresh: loadClients, addClient };
};
