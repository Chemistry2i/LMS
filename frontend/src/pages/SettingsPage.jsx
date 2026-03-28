import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Bell, 
  Eye, 
  Lock, 
  Mail, 
  Moon, 
  Sun, 
  Shield, 
  LogOut, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Tabs from '../components/Tabs';
import Badge from '../components/Badge';

const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newsletter: true,
    dueDateReminder: true,
    newBookAlert: true,
  });

  const handleSettingChange = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const settingsTabs = [
    {
      label: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-bold mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive alerts via text message' },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'In-app notifications' },
                { key: 'newsletter', label: 'Library Newsletter', desc: 'Weekly library updates' },
                { key: 'dueDateReminder', label: 'Due Date Reminders', desc: 'Remind me before books are due' },
                { key: 'newBookAlert', label: 'New Book Alerts', desc: 'Notify me about new arrivals' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key]}
                      onChange={() => handleSettingChange(item.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Privacy & Security',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-sky-600" /> Password
            </h3>
            <button className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth">
              Change Password
            </button>
          </div>

          <div className="card">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-sky-600" /> Privacy Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="font-medium">Public Profile</p>
                <Badge variant="primary"> Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <p className="font-medium">Show Reading History</p>
                <Badge variant="success"> Public</Badge>
              </div>
            </div>
          </div>

          <div className="card bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900 dark:text-amber-100">Data & Privacy</p>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                  Your data is encrypted and secure. We never share your information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Display',
      icon: Moon,
      content: (
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-bold mb-4">Appearance</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={toggleTheme}
                className={`p-6 rounded-lg border-2 transition-smooth flex flex-col items-center gap-2 ${
                  !isDark
                    ? 'border-sky-600 bg-sky-50 dark:bg-sky-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <Sun className="w-8 h-8 text-amber-500" />
                <span className="font-medium">Light Mode</span>
              </button>
              <button
                onClick={toggleTheme}
                className={`p-6 rounded-lg border-2 transition-smooth flex flex-col items-center gap-2 ${
                  isDark
                    ? 'border-sky-600 bg-sky-50 dark:bg-sky-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <Moon className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                <span className="font-medium">Dark Mode</span>
              </button>
            </div>
          </div>

          <div className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900 dark:text-blue-100">Current Theme</p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  {isDark ? 'Dark Mode' : 'Light Mode'} is active
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName="Settings"
          userRole="member"
          primaryText="Customize your LMS experience"
          secondaryText="Manage notifications, privacy, and display preferences"
        />

        <div className="max-w-3xl mx-auto">
          <div className="card">
            <Tabs tabs={settingsTabs} onChange={setActiveTab} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
