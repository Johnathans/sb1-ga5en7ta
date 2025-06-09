import React, { useState } from 'react';
import { BookOpen, Target, Clock, TrendingUp, Play, Plus, Calendar, Award, Users, Menu, X, Home, Settings, LogOut, MessageSquare, Book, FileText, Globe, ChevronDown, Database, User } from 'lucide-react';
import { UserProfile, Deck, Language } from '../types';
import { languages } from '../data/languages';

interface DashboardProps {
  user: UserProfile;
  decks: Deck[];
  onStudyDeck: (deck: Deck) => void;
  onCreateDeck: () => void;
  onBrowseDecks: () => void;
  onVocabulary: () => void;
  onSentences: () => void;
  onStories: () => void;
  onProgress: () => void;
  onProfile: () => void;
  onLanguageChange?: (language: Language) => void;
}

export function Dashboard({ 
  user, 
  decks, 
  onStudyDeck, 
  onCreateDeck, 
  onBrowseDecks, 
  onVocabulary, 
  onSentences, 
  onStories,
  onProgress,
  onProfile,
  onLanguageChange 
}: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [showVocabularyImporter, setShowVocabularyImporter] = useState(false);
  
  const userDecks = decks.filter(deck => deck.languageCode === user.targetLanguage?.code);
  const recentDecks = userDecks.filter(deck => deck.studiedAt).slice(0, 3);
  const totalCards = userDecks.reduce((sum, deck) => sum + deck.cards.length, 0);
  const studiedCards = userDecks.reduce((sum, deck) => sum + deck.progress.studied, 0);
  const masteredCards = userDecks.reduce((sum, deck) => sum + deck.progress.mastered, 0);

  const progressPercentage = totalCards > 0 ? Math.round((studiedCards / totalCards) * 100) : 0;
  const masteryPercentage = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  const handleLanguageChange = (language: Language) => {
    onLanguageChange?.(language);
    setLanguageDropdownOpen(false);
  };

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BookOpen, label: 'Browse Decks', onClick: onBrowseDecks },
    { icon: Plus, label: 'Create Deck', onClick: onCreateDeck },
    { icon: Book, label: 'Vocabulary', onClick: onVocabulary },
    { icon: MessageSquare, label: 'Sentences', onClick: onSentences },
    { icon: FileText, label: 'Stories', onClick: onStories },
    { icon: Database, label: 'Import Vocabulary', onClick: () => setShowVocabularyImporter(true) },
    { icon: Target, label: 'Progress', onClick: onProgress },
    { icon: User, label: 'Profile', onClick: onProfile },
    { icon: Settings, label: 'Settings' },
  ];

  if (showVocabularyImporter) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Vocabulary Importer</h1>
            <button
              onClick={() => setShowVocabularyImporter(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full inline-flex mb-6">
                  <Database className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Portuguese Vocabulary Importer
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Import comprehensive Portuguese vocabulary using Google Translate API. 
                  Build a complete database with 12 categories and over 300 essential words.
                </p>
              </div>

              {/* Setup Instructions */}
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Setup Instructions</span>
                </h4>
                <ol className="text-sm text-blue-800 space-y-2">
                  <li>1. Get a Google Translate API key from <a href="https://cloud.google.com/translate" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                  <li>2. Create a <code className="bg-blue-100 px-1 rounded">.env</code> file in your project root</li>
                  <li>3. Add <code className="bg-blue-100 px-1 rounded">VITE_GOOGLE_TRANSLATE_API_KEY=your_api_key_here</code></li>
                  <li>4. Restart your development server</li>
                  <li>5. The vocabulary will automatically appear in your Vocabulary Index</li>
                </ol>
                <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Once imported, the vocabulary will be stored locally and automatically loaded into your vocabulary browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">Flipped Lingo</span>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600 font-semibold text-sm">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Learning {user.targetLanguage?.name}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.active 
                    ? 'bg-pink-50 text-pink-700 border border-pink-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-gray-600">
                  Continue learning {user.targetLanguage?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                    {user.targetLanguage?.flag}
                  </div>
                  <span>{user.targetLanguage?.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {languageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Switch Language
                      </div>
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageChange(language)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            user.targetLanguage?.code === language.code
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-6 h-6 rounded bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                            {language.flag}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{language.name}</div>
                            <div className="text-xs text-gray-500">{language.nativeName}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onCreateDeck}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Deck</span>
              </button>
              <button
                onClick={onBrowseDecks}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Browse Decks
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{userDecks.length}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Active Decks</h3>
              <p className="text-gray-600 text-sm">Total flashcard decks</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{progressPercentage}%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Progress</h3>
              <p className="text-gray-600 text-sm">Cards studied</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Award className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{masteredCards}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Mastered</h3>
              <p className="text-gray-600 text-sm">Cards completed</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{user.dailyGoal}m</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Daily Goal</h3>
              <p className="text-gray-600 text-sm">Minutes per day</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Start</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={onBrowseDecks}
                    className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                        <BookOpen className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Study Existing Decks</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Practice with built-in flashcard decks</p>
                  </button>

                  <button
                    onClick={onCreateDeck}
                    className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                        <Plus className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Create Custom Deck</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Build your own flashcard collection</p>
                  </button>

                  <button
                    onClick={onVocabulary}
                    className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                        <Book className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Browse Vocabulary</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Explore words and phrases by category</p>
                  </button>

                  <button
                    onClick={onSentences}
                    className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Practice Sentences</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Learn with real-world sentence examples</p>
                  </button>

                  <button
                    onClick={onStories}
                    className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200 hover:border-pink-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-pink-100 p-2 rounded-lg group-hover:bg-pink-200 transition-colors">
                        <FileText className="w-5 h-5 text-pink-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Interactive Stories</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Immerse yourself with audio stories</p>
                  </button>

                  <button
                    onClick={() => setShowVocabularyImporter(true)}
                    className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Database className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Import Vocabulary</h3>
                    </div>
                    <p className="text-gray-600 text-sm">Build vocabulary database with Google Translate</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              {recentDecks.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                    <button
                      onClick={onBrowseDecks}
                      className="text-gray-900 hover:text-gray-700 font-medium text-sm"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentDecks.map((deck) => (
                      <div key={deck.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{deck.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{deck.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{deck.cards.length} cards</span>
                            <span>•</span>
                            <span>Last studied {deck.studiedAt?.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => onStudyDeck(deck)}
                          className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Study</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Learning Profile */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Profile</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                      {user.targetLanguage?.flag}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.targetLanguage?.name}</p>
                      <p className="text-gray-600 text-sm">Target language</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Level</span>
                        <span className="font-medium text-gray-900 capitalize">{user.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Goal</span>
                        <span className="font-medium text-gray-900">{user.goal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Daily target</span>
                        <span className="font-medium text-gray-900">{user.dailyGoal} minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 text-sm">Overall Progress</span>
                      <span className="font-medium text-gray-900">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 text-sm">Mastery Rate</span>
                      <span className="font-medium text-gray-900">{masteryPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${masteryPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <span
                      key={interest}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}