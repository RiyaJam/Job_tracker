import React, { useState, useEffect } from 'react';
import apiClient from './api/client';
import DashboardSummary from './components/DashboardSummary';
import StatusFilter from './components/StatusFilter';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import { Briefcase } from 'lucide-react';

function App() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('ALL');
  const [editingApp, setEditingApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (currentFilter === 'ALL') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.status === currentFilter));
    }
  }, [applications, currentFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('');
      const sorted = response.data.sort((a, b) => {
        if (!a.appliedDate) return 1;
        if (!b.appliedDate) return -1;
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      });
      setApplications(sorted);
      setError(null);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingApp) {
        await apiClient.put(`/${editingApp.id}`, formData);
        setEditingApp(null);
      } else {
        await apiClient.post('', formData);
      }
      fetchApplications();
    } catch (err) {
      console.error("Error saving application:", err);
      alert("Failed to save application.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await apiClient.delete(`/${id}`);
        fetchApplications();
      } catch (err) {
        console.error("Error deleting application:", err);
        alert("Failed to delete application.");
      }
    }
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingApp(null);
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans pb-12">
      {/* Premium Glassmorphism Header */}
      <header className="sticky top-0 z-50 glass mb-8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Briefcase className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 tracking-tight">
              JobTracker
            </h1>
          </div>
          <div className="text-sm font-medium text-slate-500 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200/50">
            {applications.length} Applications
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 animate-[fadeIn_0.5s_ease-out]">
        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-8 flex items-center shadow-sm">
            <span className="font-medium">{error}</span>
          </div>
        )}

        <DashboardSummary applications={applications} />
        
        <div className="mt-12 mb-8">
          <ApplicationForm 
            onSubmit={handleAddOrUpdate} 
            initialData={editingApp} 
            onCancel={cancelEdit} 
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 mt-12 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Your Applications</h2>
            <p className="text-slate-500 mt-1">Manage and track your job search progress.</p>
          </div>
          <StatusFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <ApplicationList 
            applications={filteredApplications} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
