import React, { useState } from 'react';
import MainLayout from './MainLayout';
import { 
  Users as UsersIcon, 
  Search, 
  MoreVertical, 
  ShieldAlert, 
  ShieldCheck, 
  Mail, 
  Filter
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for Ugandan members
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Namubiru', email: 'sarah.n@gmail.com', status: 'Active', borrowings: 3, fines: 0 },
    { id: 2, name: 'John Katende', email: 'jkatende@outlook.com', status: 'Suspended', borrowings: 0, fines: 15000 },
    { id: 3, name: 'Musa Kavuma', email: 'musa.k@kyu.ac.ug', status: 'Active', borrowings: 5, fines: 2500 },
    { id: 4, name: 'Grace Akello', email: 'grace.a@yahoo.com', status: 'Active', borrowings: 1, fines: 0 },
    { id: 5, name: 'Brian Mukasa', email: 'b.mukasa@tech.co.ug', status: 'Active', borrowings: 2, fines: 500 },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u));
    toast.success('Member status updated');
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Member Directory</h1>
            <p className="text-muted mt-1">Manage 452 active members across the Kampala branch</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 rounded-lg">
            <UsersIcon className="w-5 h-5" />
            <span className="font-bold">{users.length} Results</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search members by name or email..."
              className="input-base pl-12 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-outline flex items-center justify-center gap-2 h-12">
            <Filter className="w-4 h-4" /> Filter by Status
          </button>
        </div>

        <div className="card overflow-hidden border-none p-0 bg-white dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Member</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Books</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Fines (Shs)</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-smooth">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center font-bold text-sky-600">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-muted flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium">{user.borrowings}</td>
                    <td className="px-6 py-4 text-sm font-bold text-sky-600">
                      {user.fines.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleStatus(user.id)}
                          className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-smooth text-slate-400 hover:text-sky-600"
                        >
                          {user.status === 'Active' ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5 text-rose-500" />}
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageUsers;