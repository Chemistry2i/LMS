import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, User, Phone, MapPin, Calendar, Edit2, Save, X, Camera, Loader } from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profile_image_url);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '+256 712 345 678',
    location: user?.location || 'Kampala, Uganda',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save changes
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName={user?.username || 'User'}
          userRole={user?.role || 'member'}
          primaryText="Manage your profile and preferences"
          secondaryText="Keep your account information up to date"
        />

        <div className="max-w-2xl mx-auto">
          {/* Profile Header Card */}
          <div className="card mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{formData.first_name} {formData.last_name}</h2>
                  <p className="text-muted">@{user?.username}</p>
                  <p className="text-xs text-sky-600 font-medium mt-2">Member since {new Date(user?.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-lg transition-smooth ${
                  isEditing
                    ? 'bg-red-100 text-red-600'
                    : 'bg-sky-100 hover:bg-sky-200 text-sky-600'
                }`}
              >
                {isEditing ? <X className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Profile Information */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input-base"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-muted">
                    <User className="w-4 h-4" />
                    {formData.first_name || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="input-base"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-muted">
                    <User className="w-4 h-4" />
                    {formData.last_name || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-base"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-muted">
                    <Mail className="w-4 h-4" />
                    {formData.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-base"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-muted">
                    <Phone className="w-4 h-4" />
                    {formData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-base"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-muted">
                    <MapPin className="w-4 h-4" />
                    {formData.location}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full mt-6 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-smooth flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            )}
          </div>

          {/* Account Statistics */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="card text-center">
              <p className="text-3xl font-bold text-sky-600">3</p>
              <p className="text-muted text-sm">Active Borrowings</p>
            </div>
            <div className="card text-center">
              <p className="text-3xl font-bold text-blue-600">7</p>
              <p className="text-muted text-sm">Books Read</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
