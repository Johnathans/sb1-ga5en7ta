import React from 'react';
import { TrendingUp, Calendar, Target, Award, Clock, Brain, Zap, BarChart3 } from 'lucide-react';
import { Deck, SRSStats as SRSStatsType } from '../types';
import { srsService } from '../services/srsService';

interface SRSStatsProps {
  deck: Deck;
  onClose: () => void;
}

export function SRSStats({ deck, onClose }: SRSStatsProps) {
  const stats = srsService.calculateStats(deck.cards);
  const { newCards, reviewCards } = srsService.getCardsForReview(deck.cards);

  const statCards = [
    {
      title: 'Total Cards',
      value: stats.totalCards,
      icon: Brain,
      color: 'bg-blue-500',
      description: 'Cards in this deck'
    },
    {
      title: 'New Cards',
      value: stats.newCards,
      icon: Zap,
      color: 'bg-green-500',
      description: 'Never studied before'
    },
    {
      title: 'Due for Review',
      value: stats.reviewCards,
      icon: Clock,
      color: 'bg-orange-500',
      description: 'Ready to study now'
    },
    {
      title: 'Mastered',
      value: stats.masteredCards,
      icon: Award,
      color: 'bg-purple-500',
      description: 'Long intervals (21+ days)'
    },
    {
      title: 'Retention Rate',
      value: `${Math.round(stats.retentionRate)}%`,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      description: 'Average success rate'
    },
    {
      title: 'Daily Reviews',
      value: stats.dailyReviews,
      icon: Calendar,
      color: 'bg-pink-500',
      description: 'Completed today'
    }
  ];

  const upcomingReviews = deck.cards
    .filter(card => card.srsData && !card.srsData.isNew)
    .sort((a, b) => {
      const dateA = a.srsData?.nextReviewDate || new Date();
      const dateB = b.srsData?.nextReviewDate || new Date();
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 0) return 'Overdue';
    return `${diffDays} days`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                SRS Statistics
              </h2>
              <p className="text-gray-600">{deck.name}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-full`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {stat.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Study Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Study Plan */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Today's Study Plan
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">New cards to learn:</span>
                  <span className="font-semibold text-blue-600">{newCards.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cards to review:</span>
                  <span className="font-semibold text-orange-600">{reviewCards.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Estimated time:</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round((newCards.length + reviewCards.length) * 0.5)} min
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Reviews */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming Reviews
                </h3>
              </div>
              
              <div className="space-y-3">
                {upcomingReviews.length > 0 ? (
                  upcomingReviews.map((card, index) => (
                    <div key={card.id} className="flex justify-between items-center">
                      <span className="text-gray-700 truncate flex-1 mr-2">
                        {card.front}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {formatDate(card.srsData?.nextReviewDate || new Date())}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming reviews scheduled</p>
                )}
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Overview
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-1">
                  {stats.averageEaseFactor.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Average Ease Factor</div>
                <div className="text-xs text-gray-500 mt-1">
                  Higher is better (2.5 is default)
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {Math.round((stats.masteredCards / stats.totalCards) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Mastery Rate</div>
                <div className="text-xs text-gray-500 mt-1">
                  Cards with 21+ day intervals
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {stats.streakDays}
                </div>
                <div className="text-sm text-gray-600">Study Streak</div>
                <div className="text-xs text-gray-500 mt-1">
                  Consecutive days studied
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}