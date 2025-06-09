import React, { useState } from 'react';
import { ArrowLeft, User, CreditCard, Bell, Globe, BookOpen, Shield, HelpCircle, LogOut, Edit3, Check, X, Crown, Star } from 'lucide-react';
import { UserProfile, Language } from '../types';
import { languages } from '../data/languages';

interface ProfilePageProps {
  user: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export function ProfilePage({ user, onBack, onUpdateProfile, onLogout }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'subscription' | 'preferences' | 'notifications' | 'privacy'>('account');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });

  const handleSaveProfile = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
    setIsEditing(false);
  };

  const handleLanguageChange = (language: Language) => {
    onUpdateProfile({ targetLanguage: language });
  };

  const handleLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    onUpdateProfile({ level });
  };

  const handleDailyGoalChange = (dailyGoal: number) => {
    onUpdateProfile({ dailyGoal });
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const renderAccountTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveProfile}
                className="flex items-center space-x-1 bg-gray-900 text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-bold text-2xl">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {user.createdAt.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">7</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">145</div>
            <div className="text-sm text-gray-600">Minutes Studied</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">23</div>
            <div className="text-sm text-gray-600">Cards Mastered</div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <div className="text-gray-400">→</div>
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <div className="text-gray-400">→</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Current Plan</h2>
          <div className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Free Plan</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Free Plan</h3>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$0</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-gray-900" />
              <span>Access to basic flashcards</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-gray-900" />
              <span>5 custom decks</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-gray-900" />
              <span>Basic progress tracking</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
          Upgrade to Pro
        </button>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Available Plans</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pro Plan */}
          <div className="border-2 border-pink-200 rounded-xl p-6 bg-pink-50">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="w-5 h-5 text-pink-600" />
              <h4 className="text-lg font-semibold text-gray-900">Pro Plan</h4>
              <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">Popular</span>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">$9.99</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-pink-600" />
                <span>Unlimited custom decks</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-pink-600" />
                <span>Advanced SRS algorithm</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-pink-600" />
                <span>Audio pronunciation</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-pink-600" />
                <span>Detailed analytics</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-pink-600" />
                <span>Offline mode</span>
              </div>
            </div>

            <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
              Upgrade to Pro
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-gray-600" />
              <h4 className="text-lg font-semibold text-gray-900">Premium Plan</h4>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-900 mb-1">$19.99</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-gray-600" />
                <span>Everything in Pro</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-gray-600" />
                <span>AI-powered recommendations</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-gray-600" />
                <span>Live tutoring sessions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-gray-600" />
                <span>Priority support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-gray-600" />
                <span>Early access to features</span>
              </div>
            </div>

            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Billing History</h3>
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <CreditCard className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-600">No billing history available</p>
          <p className="text-sm text-gray-500">Upgrade to a paid plan to see your billing history</p>
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      {/* Language Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Language Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
            <select
              value={user.targetLanguage?.code || ''}
              onChange={(e) => {
                const language = languages.find(l => l.code === e.target.value);
                if (language) handleLanguageChange(language);
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              {languages.map(language => (
                <option key={language.code} value={language.code}>
                  {language.flag} {language.name} ({language.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => handleLevelChange(level)}
                  className={`p-3 rounded-lg border-2 transition-colors capitalize ${
                    user.level === level
                      ? 'border-gray-900 bg-gray-50 text-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Study Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Study Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Goal: {user.dailyGoal} minutes
            </label>
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={user.dailyGoal}
              onChange={(e) => handleDailyGoalChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5 min</span>
              <span>120 min</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-900">Auto-play Audio</h4>
                <p className="text-sm text-gray-600">Automatically play pronunciation</p>
              </div>
              <input type="checkbox" className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h4 className="font-medium text-gray-900">Show Hints</h4>
                <p className="text-sm text-gray-600">Display helpful hints during study</p>
              </div>
              <input type="checkbox" className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" defaultChecked />
            </div>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map(interest => (
            <span
              key={interest}
              className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
        <button className="mt-4 text-gray-600 hover:text-gray-900 text-sm font-medium">
          Edit interests
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Study Reminders</h4>
              <p className="text-sm text-gray-600">Daily reminders to practice</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Progress Updates</h4>
              <p className="text-sm text-gray-600">Weekly progress summaries</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">New Features</h4>
              <p className="text-sm text-gray-600">Updates about new features</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Marketing Emails</h4>
              <p className="text-sm text-gray-600">Tips and language learning content</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Privacy & Data</h3>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Download Your Data</h4>
              <p className="text-sm text-gray-600">Export all your learning data</p>
            </div>
            <div className="text-gray-400">→</div>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div>
              <h4 className="font-medium text-gray-900">Privacy Settings</h4>
              <p className="text-sm text-gray-600">Control who can see your progress</p>
            </div>
            <div className="text-gray-400">→</div>
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-red-600">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-red-500">Permanently delete your account and data</p>
            </div>
            <div className="text-red-400">→</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account': return renderAccountTab();
      case 'subscription': return renderSubscriptionTab();
      case 'preferences': return renderPreferencesTab();
      case 'notifications': return renderNotificationsTab();
      case 'privacy': return renderPrivacyTab();
      default: return renderAccountTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}