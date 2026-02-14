import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ClientsSidebar } from './features/clients/ClientsSidebar'
import { ChecklistPanel } from './features/checklist/ChecklistPanel'
import { EditorPanel } from './features/editor/EditorPanel'
import { useClients } from './hooks/useClients'
import type { FinancialYear } from './types'

import type { ChecklistItem } from './features/checklist/data';

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<FinancialYear>('2024-25');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedChecklistItem, setSelectedChecklistItem] = useState<ChecklistItem | null>(null);
  const { clients, addClient } = useClients(selectedYear);

  // Reset checklist selection when client changes
  const handleClientSelect = (id: string) => {
    setSelectedClientId(id);
    setSelectedChecklistItem(null);
  };



  return (
    <>
      <AppLayout
        leftColumn={
          <ClientsSidebar
            clients={clients}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            selectedClientId={selectedClientId}
            onSelectClient={handleClientSelect}
            // onVerifyClick prop removed from Sidebar
            onAddClient={addClient}
          />
        }
        centerColumn={
          selectedClientId ? (
            <ChecklistPanel
              onSelectItem={setSelectedChecklistItem}
              selectedItemId={selectedChecklistItem?.id}
            />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b', padding: '1rem', textAlign: 'center' }}>
              Select a client to view the compliance checklist.
            </div>
          )
        }
        rightColumn={
          <EditorPanel
            clientId={selectedClientId}
            checklistItem={selectedChecklistItem}
            insertPayload={null}
          />
        }
      />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
