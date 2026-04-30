import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, LineChart, Line
} from 'recharts';
import { 
  AlertOctagon,
  Terminal,
  Activity,
  Clock,
  ArrowUpRight,
  Shield,
  Cpu,
  Server
} from 'lucide-react';

const incidentTrendData = [
  { day: 'Mon', p1: 0, p2: 2, p3: 5 },
  { day: 'Tue', p1: 1, p2: 1, p3: 8 },
  { day: 'Wed', p1: 0, p2: 3, p3: 4 },
  { day: 'Thu', p1: 0, p2: 0, p3: 12 },
  { day: 'Fri', p1: 0, p2: 2, p3: 6 },
  { day: 'Sat', p1: 0, p2: 0, p3: 2 },
  { day: 'Sun', p1: 0, p2: 1, p3: 3 },
];

const KPI_CARDS = [
  { title: 'Active Incidents', value: '1', trend: '1 High, 0 Critical', color: 'rose', icon: AlertOctagon },
  { title: 'Global MTTR', value: '24m', trend: '-12% vs last month', color: 'emerald', icon: Clock },
  { title: 'Runbook Executions', value: '842', trend: '+145 auto-remediated', color: 'blue', icon: Terminal },
  { title: 'Governance Compliance', value: '98%', trend: 'All regions passing', color: 'indigo', icon: Shield },
];

const OperationsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Global Operations Command Center</h1>
          <p className="text-slate-400">Centralized incident response, runbook automation, and SRE governance.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Declare Incident
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Execute Runbook
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Trends */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Incident Volume (7 Days)</h3>
            <div className="flex gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-rose-500 rounded-full"></div> P1 (Critical)</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> P2 (High)</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> P3 (Medium)</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                />
                <Bar dataKey="p1" stackId="a" fill="#f43f5e" name="P1 Critical" />
                <Bar dataKey="p2" stackId="a" fill="#f97316" name="P2 High" />
                <Bar dataKey="p3" stackId="a" fill="#3b82f6" name="P3 Medium" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alerts Feed */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Correlated Alerts</h3>
            <span className="bg-rose-500/10 text-rose-400 text-xs px-2 py-1 rounded border border-rose-500/20">Auto-Triage Active</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {[
              { time: '2m ago', title: 'High Memory Usage', service: 'auth-service', severity: 'High', autoFix: 'Pending Runbook' },
              { time: '15m ago', title: 'Kafka Consumer Lag', service: 'order-processor', severity: 'Medium', autoFix: 'Scaling Workers' },
              { time: '1h ago', title: 'Database Failover', service: 'pg-cluster-prod', severity: 'Critical', autoFix: 'Completed' },
              { time: '2h ago', title: 'Increased 5xx Errors', service: 'payment-gateway', severity: 'Medium', autoFix: 'Rollback Executed' },
            ].map((alert, i) => (
              <div key={i} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'Critical' ? 'bg-rose-500' :
                      alert.severity === 'High' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>
                    <span className="font-semibold text-sm text-slate-200">{alert.title}</span>
                  </div>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 flex items-center gap-1"><Server className="w-3 h-3"/> {alert.service}</span>
                  <span className={`px-2 py-0.5 rounded ${
                    alert.autoFix === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                    alert.autoFix === 'Pending Runbook' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>{alert.autoFix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incidents Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Active & Recent Incidents</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All Incidents</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Incident</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Commander</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'INC-9942', title: 'API Gateway Latency Spike', sev: 'SEV-2', status: 'Investigating', cmdr: 'Sarah J.', duration: '14m' },
                { id: 'INC-9941', title: 'Payment Processing Failures', sev: 'SEV-1', status: 'Resolved', cmdr: 'Mike T.', duration: '42m' },
                { id: 'INC-9940', title: 'Redis Cache Evictions High', sev: 'SEV-3', status: 'Monitoring', cmdr: 'Alex W.', duration: '2h 15m' },
              ].map((inc, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">{inc.id}</span>
                      <span className="text-xs text-slate-400">{inc.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      inc.sev === 'SEV-1' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      inc.sev === 'SEV-2' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {inc.sev}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${
                      inc.status === 'Resolved' ? 'text-emerald-500' :
                      inc.status === 'Investigating' ? 'text-amber-500' : 'text-blue-500'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{inc.cmdr}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{inc.duration}</td>
                  <td className="px-6 py-4">
                    <button className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1 rounded flex items-center gap-1">
                      War Room <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OperationsDashboard;
