import React, { useState, useMemo } from 'react';
import { ArrowLeft, TrendingUp, Calendar, Target, Clock, BookOpen, BarChart3 } from 'lucide-react';
import { UserProfile, Deck } from '../types';

interface ProgressPageProps {
  user: UserProfile;
  decks: Deck[];
  onBack: () => void;
}

export function ProgressPage({ user, decks, onBack }: ProgressPageProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  const userDecks = decks.filter(deck => deck.languageCode === user.targetLanguage?.code);
  
  const stats = useMemo(() => {
    const totalCards = userDecks.reduce((sum, deck) => sum + deck.cards.length, 0);
    const studiedCards = userDecks.reduce((sum, deck) => sum + deck.progress.studied, 0);
    const masteredCards = userDecks.reduce((sum, deck) => sum + deck.progress.mastered, 0);
    
    const progressPercentage = totalCards > 0 ? Math.round((studiedCards / totalCards) * 100) : 0;
    const masteryPercentage = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;
    
    const studyStreak = 7;
    const totalStudyTime = 145;
    
    return {
      totalCards,
      studiedCards,
      masteredCards,
      progressPercentage,
      masteryPercentage,
      studyStreak,
      totalStudyTime,
      activeDecks: userDecks.length,
      completedDecks: userDecks.filter(deck => deck.progress.mastered === deck.cards.length).length
    };
  }, [userDecks]);

  const weeklyProgress = [
    { day: 'Mon', cards: 12, time: 25 },
    { day: 'Tue', cards: 8, time: 18 },
    { day: 'Wed', cards: 15, time: 32 },
    { day: 'Thu', cards: 10, time: 22 },
    { day: 'Fri', cards: 18, time: 35 },
    { day: 'Sat', cards: 22, time: 45 },
    { day: 'Sun', cards: 14, time: 28 }
  ];

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
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                {user.targetLanguage?.flag}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Learning Progress
                </h1>
                <p className="text-gray-600">{user.targetLanguage?.name} • {user.level} level</p>
              </div>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex bg-white rounded-xl border border-gray-200 p-1">
            {(['week', 'month', 'year'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  selectedTimeframe === timeframe
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.progressPercentage}%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Overall Progress</h3>
            <p className="text-gray-600 text-sm">{stats.studiedCards} of {stats.totalCards} cards studied</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Target className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.masteredCards}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Cards Mastered</h3>
            <p className="text-gray-600 text-sm">{stats.masteryPercentage}% mastery rate</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.masteryPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.studyStreak}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Study Streak</h3>
            <p className="text-gray-600 text-sm">Consecutive days</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalStudyTime}m</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Study Time</h3>
            <p className="text-gray-600 text-sm">This month</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Progress Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Weekly Activity</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    <span>Cards Studied</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-4">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="text-center">
                    <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                    <div className="space-y-2">
                      <div className="bg-gray-100 rounded-lg p-2 h-20 flex flex-col justify-end">
                        <div 
                          className="bg-pink-500 rounded transition-all duration-500"
                          style={{ height: `${(day.cards / 25) * 100}%`, minHeight: '4px' }}
                        />
                      </div>
                      <div className="text-xs font-medium text-gray-900">{day.cards}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deck Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Deck Progress</h2>
              <div className="space-y-4">
                {userDecks.slice(0, 5).map((deck) => {
                  const deckProgress = deck.cards.length > 0 ? (deck.progress.studied / deck.cards.length) * 100 : 0;
                  const deckMastery = deck.cards.length > 0 ? (deck.progress.mastered / deck.cards.length) * 100 : 0;
                  
                  return (
                    <div key={deck.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{deck.name}</h3>
                          <p className="text-sm text-gray-600">{deck.cards.length} cards</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{Math.round(deckProgress)}%</div>
                          <div className="text-xs text-gray-500">Progress</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Studied: {deck.progress.studied}</span>
                          <span>Mastered: {deck.progress.mastered}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="relative h-2 rounded-full overflow-hidden">
                            <div 
                              className="absolute left-0 top-0 h-full bg-gray-400 transition-all duration-500"
                              style={{ width: `${deckProgress}%` }}
                            />
                            <div 
                              className="absolute left-0 top-0 h-full bg-gray-900 transition-all duration-500"
                              style={{ width: `${deckMastery}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goal Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Goal</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-1">25 / {user.dailyGoal}</div>
                <div className="text-sm text-gray-600">minutes today</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gray-900 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((25 / user.dailyGoal) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                {user.dailyGoal - 25 > 0 ? `${user.dailyGoal - 25} minutes to go` : 'Goal completed! 🎉'}
              </p>
            </div>

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

            {/* Performance Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Decks</span>
                  <span className="font-semibold text-gray-900">{stats.activeDecks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed Decks</span>
                  <span className="font-semibold text-gray-900">{stats.completedDecks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Study Sessions</span>
                  <span className="font-semibold text-gray-900">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Cards</span>
                  <span className="font-semibold text-gray-900">{stats.totalCards}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}