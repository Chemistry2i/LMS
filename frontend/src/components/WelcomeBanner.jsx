import React from 'react';
import { Sparkles, TrendingUp, BookOpen, Users } from 'lucide-react';

const WelcomeBanner = ({ userName, userRole = 'member', primaryText, secondaryText, stats }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 18) return '☀️';
    return '🌙';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 dark:from-sky-900/40 dark:via-blue-900/40 dark:to-indigo-900/40 p-8 mb-8">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-300/10 dark:bg-sky-400/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-400/5 rounded-full blur-3xl -ml-40 -mb-40"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{getIcon()}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {getGreeting()}, {userName}! <Sparkles className="inline w-8 h-8 text-yellow-300" />
              </h2>
            </div>
            <p className="text-sky-100 text-lg">
              {primaryText || 'Welcome back to your library management system'}
            </p>
            {secondaryText && (
              <p className="text-sky-100/80 mt-2">{secondaryText}</p>
            )}
          </div>

          {/* Role Badge */}
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-white font-medium text-sm capitalize">{userRole}</span>
          </div>
        </div>

        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-smooth">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sky-100 text-xs font-medium">{stat.label}</p>
                    <p className="text-white text-xl font-bold mt-1">{stat.value}</p>
                  </div>
                  {stat.icon && (
                    <stat.icon className="w-6 h-6 text-sky-200 opacity-50" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Badges */}
        <div className="flex flex-wrap gap-3 mt-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium border border-white/30">
            <TrendingUp className="w-3 h-3" /> Active
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/30 backdrop-blur-sm rounded-full text-xs text-emerald-100 font-medium border border-emerald-400/50">
            ✓ Library Connected
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
