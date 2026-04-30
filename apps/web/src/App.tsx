import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import OperationsDashboard from './pages/OperationsDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The Operations Landing Zone is currently synchronizing with PagerDuty, Jira, and internal telemetry systems. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<OperationsDashboard />} />
          <Route path="/incidents" element={<Placeholder name="Incident Command & Response" />} />
          <Route path="/runbooks" element={<Placeholder name="Automated Runbook Execution" />} />
          <Route path="/alerts" element={<Placeholder name="Unified Alert Console" />} />
          <Route path="/changes" element={<Placeholder name="Change Management & Approvals" />} />
          <Route path="/governance" element={<Placeholder name="SRE Governance & Policy" />} />
          <Route path="/oncall" element={<Placeholder name="Global On-Call Roster" />} />
          <Route path="/settings" element={<Placeholder name="Platform Integrations" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
