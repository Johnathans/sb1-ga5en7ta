import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Brain, Zap, ThumbsUp } from 'lucide-react';
import { Deck, StudySession } from '../types';
import { FlashCard } from './FlashCard';

interface StudyModeProps {
  deck: Deck;
  onBack: () => void;
  onComplete: (session: StudySession) => void;
}

type KnowledgeLevel = 'hard' | 'good' | 'easy' | 'perfect';

export function StudyMode({ deck, onBack, onComplete }: StudyModeProps) {
  const [session, setSession] = useState<StudySession>({
    deckId: deck.id,
    currentCardIndex: 0,
    isFlipped: false,
    correctCount: 0,
    incorrectCount: 0,
    startTime: new Date()
  });

  const [showResults, setShowResults] = useState(false);
  const [knowledgeStats, setKnowledgeStats] = useState({
    hard: 0,
    good: 0,
    easy: 0,
    perfect: 0
  });

  const currentCard = deck.cards[session.currentCardIndex];
  const progress = ((session.currentCardIndex + 1) / deck.cards.length) * 100;

  const handleFlip = () => {
    setSession(prev => ({ ...prev, isFlipped: !prev.isFlipped }));
  };

  const handleKnowledgeLevel = (level: KnowledgeLevel) => {
    setKnowledgeStats(prev => ({
      ...prev,
      [level]: prev[level] + 1
    }));

    const isCorrect = level === 'easy' || level === 'perfect';
    setSession(prev => ({
      ...prev,
      correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
      incorrectCount: isCorrect ? prev.incorrectCount : prev.incorrectCount + 1,
      isFlipped: false
    }));

    setTimeout(() => {
      if (session.currentCardIndex + 1 >= deck.cards.length) {
        setShowResults(true);
      } else {
        setSession(prev => ({
          ...prev,
          currentCardIndex: prev.currentCardIndex + 1
        }));
      }
    }, 300);
  };

  const handleComplete = () => {
    onComplete(session);
  };

  const knowledgeLevels = [
    {
      id: 'hard' as KnowledgeLevel,
      label: 'Hard',
      description: 'Need more practice',
      icon: Brain,
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200 hover:border-gray-300'
    },
    {
      id: 'good' as KnowledgeLevel,
      label: 'Good',
      description: 'Getting there',
      icon: ThumbsUp,
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200 hover:border-gray-300'
    },
    {
      id: 'easy' as KnowledgeLevel,
      label: 'Easy',
      description: 'Know it well',
      icon: Zap,
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200 hover:border-gray-300'
    },
    {
      id: 'perfect' as KnowledgeLevel,
      label: 'Perfect',
      description: 'Mastered it',
      icon: Trophy,
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-gray-900 hover:border-gray-800'
    }
  ];

  if (showResults) {
    const totalCards = Object.values(knowledgeStats).reduce((sum, count) => sum + count, 0);
    const masteryScore = Math.round(((knowledgeStats.easy + knowledgeStats.perfect) / totalCards) * 100);

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="mb-8">
              <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4">
                <Trophy className="w-8 h-8 text-gray-600" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Study Complete!
              </h1>
              <p className="text-gray-600">
                Great job studying {deck.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {knowledgeLevels.map((level) => (
                <div key={level.id} className="text-center">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="text-xl font-semibold text-gray-900 mb-1">
                      {knowledgeStats[level.id]}
                    </div>
                    <div className="text-sm text-gray-600">{level.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="text-3xl font-semibold text-gray-900 mb-2">
                {masteryScore}%
              </div>
              <div className="text-gray-600 mb-3">Mastery Score</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${masteryScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleComplete}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setSession({
                    deckId: deck.id,
                    currentCardIndex: 0,
                    isFlipped: false,
                    correctCount: 0,
                    incorrectCount: 0,
                    startTime: new Date()
                  });
                  setKnowledgeStats({ hard: 0, good: 0, easy: 0, perfect: 0 });
                  setShowResults(false);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Study Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {deck.name}
            </h1>
            <p className="text-gray-600 text-sm">
              Card {session.currentCardIndex + 1} of {deck.cards.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-gray-600">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-full h-2 shadow-sm border border-gray-100">
            <div 
              className="bg-gray-900 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <FlashCard
            card={currentCard}
            isFlipped={session.isFlipped}
            onFlip={handleFlip}
          />
        </div>

        {/* Knowledge Level Buttons */}
        {session.isFlipped && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How well do you know this?
              </h3>
              <p className="text-gray-600 text-sm">
                Your answer helps us show you the right cards at the right time
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {knowledgeLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleKnowledgeLevel(level.id)}
                  className={`${level.bgColor} ${level.borderColor} border rounded-xl p-4 transition-all duration-200 hover:shadow-sm text-left`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${level.id === 'perfect' ? 'bg-white/20' : 'bg-gray-200'}`}>
                      <level.icon className={`w-5 h-5 ${level.id === 'perfect' ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${level.textColor} mb-1`}>
                        {level.label}
                      </h4>
                      <p className={`text-sm ${level.id === 'perfect' ? 'text-white/80' : 'text-gray-600'}`}>
                        {level.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Difficulty Indicator */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-sm font-medium text-gray-700">
                  Difficulty: {currentCard.difficulty || 'Medium'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}