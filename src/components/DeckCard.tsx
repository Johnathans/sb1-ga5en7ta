import React, { useState } from 'react';
import { BookOpen, Calendar, TrendingUp, User, Play, BarChart3 } from 'lucide-react';
import { Deck } from '../types';
import { SRSStats } from './SRSStats';
import { srsService } from '../services/srsService';

interface DeckCardProps {
  deck: Deck;
  onStudy: (deck: Deck) => void;
  onEdit?: (deck: Deck) => void;
}

export function DeckCard({ deck, onStudy, onEdit }: DeckCardProps) {
  const [showSRSStats, setShowSRSStats] = useState(false);
  
  const progressPercentage = deck.cards.length > 0 
    ? Math.round((deck.progress.studied / deck.cards.length) * 100) 
    : 0;

  const masteredPercentage = deck.cards.length > 0 
    ? Math.round((deck.progress.mastered / deck.cards.length) * 100) 
    : 0;

  // Get SRS statistics
  const srsStats = srsService.calculateStats(deck.cards);
  const { newCards, reviewCards } = srsService.getCardsForReview(deck.cards);
  const hasSRSData = deck.cards.some(card => card.srsData && !card.srsData.isNew);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {deck.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {deck.description}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              {deck.isBuiltIn ? (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                  Built-in
                </span>
              ) : (
                <div className="flex items-center text-gray-500">
                  <User className="w-3 h-3 mr-1" />
                  <span>Custom</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>{deck.cards.length} cards</span>
              </div>
              {deck.studiedAt && (
                <div className="flex items-center space-x-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(deck.studiedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* SRS Statistics */}
            {hasSRSData && (
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-800">SRS Progress</span>
                  <button
                    onClick={() => setShowSRSStats(true)}
                    className="text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-emerald-700">{newCards.length}</div>
                    <div className="text-emerald-600">New</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-orange-700">{reviewCards.length}</div>
                    <div className="text-orange-600">Review</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-700">{srsStats.masteredCards}</div>
                    <div className="text-purple-600">Mastered</div>
                  </div>
                </div>
              </div>
            )}

            {/* Traditional Progress */}
            {deck.progress.studied > 0 && !hasSRSData && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                {masteredPercentage > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>Mastered: {masteredPercentage}%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => onStudy(deck)}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Study</span>
            </button>
            {!deck.isBuiltIn && onEdit && (
              <button
                onClick={() => onEdit(deck)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SRS Stats Modal */}
      {showSRSStats && (
        <SRSStats
          deck={deck}
          onClose={() => setShowSRSStats(false)}
        />
      )}
    </>
  );
}