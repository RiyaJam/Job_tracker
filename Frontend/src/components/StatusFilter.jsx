import React from 'react';

const StatusFilter = ({ currentFilter, onFilterChange }) => {
  const statuses = [
    { value: 'ALL', label: 'All' },
    { value: 'APPLIED', label: 'Applied' },
    { value: 'INTERVIEW', label: 'Interviewing' },
    { value: 'OFFER', label: 'Offers' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'WITHDRAWN', label: 'Withdrawn' }
  ];

  return (
    <div className="flex items-center overflow-x-auto hide-scrollbar bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
      {statuses.map(status => {
        const isActive = currentFilter === status.value;
        return (
          <button
            key={status.value}
            onClick={() => onFilterChange(status.value)}
            className={`
              relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap
              ${isActive 
                ? 'text-blue-700 bg-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }
            `}
          >
            {status.label}
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;
