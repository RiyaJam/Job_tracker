import React from 'react';
import { Briefcase, Send, Users, CheckCircle, XCircle } from 'lucide-react';

const DashboardSummary = ({ applications }) => {
  const total = applications.length;
  const applied = applications.filter(a => a.status === 'APPLIED').length;
  const interview = applications.filter(a => a.status === 'INTERVIEW').length;
  const offers = applications.filter(a => a.status === 'OFFER').length;
  const rejected = applications.filter(a => a.status === 'REJECTED').length;

  const cards = [
    {
      title: 'Total',
      value: total,
      icon: Briefcase,
      color: 'from-slate-700 to-slate-900',
      shadow: 'shadow-slate-200'
    },
    {
      title: 'Applied',
      value: applied,
      icon: Send,
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-200'
    },
    {
      title: 'Interview',
      value: interview,
      icon: Users,
      color: 'from-amber-400 to-orange-500',
      shadow: 'shadow-orange-200'
    },
    {
      title: 'Offers',
      value: offers,
      icon: CheckCircle,
      color: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-200'
    },
    {
      title: 'Rejected',
      value: rejected,
      icon: XCircle,
      color: 'from-rose-400 to-red-500',
      shadow: 'shadow-red-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
        >
          {/* Subtle background glow effect */}
          <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-slate-500 font-medium text-sm">{card.title}</span>
            <div className={`bg-gradient-to-br ${card.color} p-2 rounded-lg text-white shadow-md ${card.shadow}`}>
              <card.icon size={18} strokeWidth={2.5} />
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-3xl font-bold text-slate-800">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
