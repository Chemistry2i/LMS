import React, { useState } from 'react';
import MainLayout from './MainLayout';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Calendar, Filter, Download, TrendingUp, UserCheck, BookCopy, CreditCard } from 'lucide-react';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Mock Data
  const authorData = [
    { name: 'Chinua Achebe', count: 145 },
    { name: 'Jennifer Makumbi', count: 132 },
    { name: 'Ngũgĩ wa Thiong\'o', count: 98 },
    { name: 'Doreen Baingana', count: 85 },
    { name: 'Moses Isegawa', count: 72 },
  ];

  const fineRecoveryData = [
    { day: 'Mon', projected: 45000, collected: 32000 },
    { day: 'Tue', projected: 52000, collected: 48000 },
    { day: 'Wed', projected: 48000, collected: 45000 },
    { day: 'Thu', projected: 61000, collected: 59000 },
    { day: 'Fri', projected: 55000, collected: 52000 },
    { day: 'Sat', projected: 30000, collected: 28000 },
    { day: 'Sun', projected: 20000, collected: 15000 },
  ];

  // Simulated Heatmap Data (Member Activity by Day/Hour)
  const heatmapData = [
    { x: 1, y: 1, z: 10 }, { x: 1, y: 2, z: 40 }, { x: 1, y: 3, z: 70 },
    { x: 2, y: 1, z: 20 }, { x: 2, y: 2, z: 90 }, { x: 2, y: 3, z: 30 },
    { x: 3, y: 1, z: 50 }, { x: 3, y: 2, z: 20 }, { x: 3, y: 3, z: 80 },
    { x: 4, y: 1, z: 80 }, { x: 4, y: 2, z: 100 }, { x: 4, y: 3, z: 60 },
    { x: 5, y: 1, z: 30 }, { x: 5, y: 2, z: 50 }, { x: 5, y: 3, z: 20 },
  ];

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Institutional Reports</h1>
            <p className="text-muted mt-1">Deep-dive performance analytics for Kampala Main Branch</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select 
                className="input-base pl-10 h-11 text-sm bg-white dark:bg-slate-900 min-w-[180px]"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
                <option>Year to Date</option>
              </select>
            </div>
            <button className="btn-outline flex items-center gap-2 h-11">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Top Category', value: 'Fiction', sub: '42% of loans', icon: TrendingUp, color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'New Members', value: '+84', sub: 'Since last month', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Fine Recovery', value: '92%', sub: 'Target: 95%', icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, i) => (
            <div key={i} className="card bg-white dark:bg-slate-900 flex items-center gap-4 p-6 border-none shadow-subtle">
              <div className={`${stat.bg} p-4 rounded-2xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                <p className="text-[10px] text-muted font-medium mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trending Authors */}
          <div className="card bg-white dark:bg-slate-900 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg">Top Trending Authors</h3>
              <BookCopy className="w-5 h-5 text-slate-300" />
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={authorData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} width={120} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {authorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#0ea5e9' : '#e2e8f0'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Heatmap (Member Engagement) */}
          <div className="card bg-white dark:bg-slate-900 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-lg">Engagement Intensity</h3>
                <p className="text-xs text-muted">Peak borrowing hours vs day of week</p>
              </div>
              <TrendingUp className="w-5 h-5 text-sky-500" />
            </div>
            <div className="h-[350px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" name="Day" hide />
                  <YAxis type="number" dataKey="y" name="Hour" hide />
                  <ZAxis type="number" dataKey="z" range={[50, 1500]} name="Activity" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ payload }) => {
                    if (payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl text-xs font-bold">
                          {payload[0].value}% Intensity
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Scatter name="Activity" data={heatmapData} fill="#0ea5e9" opacity={0.6} shape="rect" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-4 px-4">
              <span className="text-[10px] font-bold text-slate-400">LOW ACTIVITY</span>
              <div className="h-2 w-32 bg-gradient-to-r from-sky-100 to-sky-600 rounded-full" />
              <span className="text-[10px] font-bold text-slate-400">PEAK PEFORMANCE</span>
            </div>
          </div>
        </div>

        {/* Fine Recovery Comparison */}
        <div className="card bg-white dark:bg-slate-900 p-8">
          <h3 className="font-bold text-lg mb-8">Weekly Fine Recovery (Target vs Actual)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fineRecoveryData}>
                <defs>
                  <linearGradient id="targetColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(v) => `Shs ${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(v) => `Shs ${v.toLocaleString()}`}
                />
                <Area type="monotone" dataKey="projected" stroke="#94a3b8" fillOpacity={1} fill="url(#targetColor)" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="collected" stroke="#0ea5e9" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;