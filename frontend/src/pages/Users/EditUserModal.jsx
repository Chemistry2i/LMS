import React, { useState, useEffect } from 'react';
import BaseModal from '../../components/Modals/BaseModal';

const EditUserModal = ({ isOpen, onClose, user, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        username: user.username || '',
        role: user.role || '',
      });
      setErrors({});
    }
  }, [user, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim() || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  if (!isOpen || !user) return null;
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit User" size="md"
      footer={
        <>
          <button onClick={onClose} disabled={isLoading} className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={isLoading} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 font-semibold">{isLoading ? 'Saving...' : 'Save Changes'}</button>
        </>
      }
    >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Username *</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.username && <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">{errors.username}</div>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">First Name *</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.first_name && <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">{errors.first_name}</div>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Last Name *</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.last_name && <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">{errors.last_name}</div>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm">{errors.email}</div>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Role</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" disabled />
        </div>
      </form>
    </BaseModal>
  );
};

export default EditUserModal;
