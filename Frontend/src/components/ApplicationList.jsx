import React from 'react';
import { Edit2, Trash2, ExternalLink, Calendar, Building, Briefcase } from 'lucide-react';

const ApplicationList = ({ applications, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'OFFER':
        return <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm">Offer</span>;
      case 'REJECTED':
        return <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-700 border border-rose-200 shadow-sm">Rejected</span>;
      case 'INTERVIEW':
        return <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-700 border border-amber-200 shadow-sm">Interview</span>;
      case 'APPLIED':
        return <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 border border-blue-200 shadow-sm">Applied</span>;
      case 'WITHDRAWN':
        return <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700 border border-slate-200 shadow-sm">Withdrawn</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <Briefcase className="text-slate-400" size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No applications found</h3>
        <p className="text-slate-500 max-w-sm">You haven't added any applications yet, or none match your current filter. Get started above!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-5 font-semibold">Company & Role</th>
              <th className="p-5 font-semibold">Status</th>
              <th className="p-5 font-semibold">Applied Date</th>
              <th className="p-5 font-semibold">Deadline</th>
              <th className="p-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors duration-200 group">
                <td className="p-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Building size={14} className="text-slate-400" />
                      {app.companyName}
                    </span>
                    <span className="text-sm text-slate-500 font-medium mt-0.5">{app.roleTitle}</span>
                    {app.jobLink && (
                      <a href={app.jobLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center mt-1.5 font-medium transition-colors w-fit">
                        <ExternalLink size={12} className="mr-1" /> View Listing
                      </a>
                    )}
                  </div>
                </td>
                <td className="p-5 align-top pt-6">
                  {getStatusBadge(app.status)}
                </td>
                <td className="p-5 align-top pt-6 text-sm text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    {formatDate(app.appliedDate)}
                  </div>
                </td>
                <td className="p-5 align-top pt-6 text-sm text-slate-600 font-medium">
                  {app.deadline ? (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(app.deadline)}
                    </div>
                  ) : '-'}
                </td>
                <td className="p-5 align-top pt-5 text-right">
                  <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onEdit(app)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Edit Application"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(app.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                      title="Delete Application"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationList;
