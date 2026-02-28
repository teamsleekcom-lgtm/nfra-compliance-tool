import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ClientsSidebar } from './features/clients/ClientsSidebar'
import { ChecklistPanel } from './features/checklist/ChecklistPanel'
import { EditorPanel } from './features/editor/EditorPanel'
import { EmptyState } from './components/EmptyState'
import { FirstTimeModal } from './components/FirstTimeModal'
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
          ) : clients.length === 0 ? (
            <EmptyState
              onAddClientClick={() => {
                document.getElementById('add-client-sidebar-btn')?.click();
              }}
            />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b', padding: '1rem', textAlign: 'center' }}>
              Select a client to view the compliance checklist.
            </div>
          )
        }
        rightColumn={
          selectedClientId ? (
            <EditorPanel
              clientId={selectedClientId}
              checklistItem={selectedChecklistItem}
              insertPayload={null}
            />
          ) : clients.length === 0 ? null : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b', padding: '1rem', textAlign: 'center' }}>
              Select a required section to begin editing.
            </div>
          )
        }
      />
      <FirstTimeModal />
    </>
  )
}

import { LandingPage } from './pages/LandingPage'
import { HasherPage } from './pages/HasherPage'
import { TermsPage } from './pages/TermsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/asm" element={<Dashboard />} />
      <Route path="/hasher" element={<HasherPage />} />
      <Route path="/terms" element={<TermsPage />} />
      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
