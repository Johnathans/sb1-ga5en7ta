import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Timer, Zap } from 'lucide-react';
import { Deck, StudySession } from '../types';

interface MultiMatchCard {
  id: string;
  text: string;
  type: 'front' | 'back';
  originalCardId: string;
  isMatched: boolean;
  isSelected: boolean;
  position: { x: number; y: number };
}

interface MultiMatchModeProps {
  deck: Deck;
  onBack: () => void;
  onComplete: (session: StudySession) => void;
}

export function MultiMatchMode({ deck, onBack, onComplete }: MultiMatchModeProps) {
  const [leftCards, setLeftCards] = useState<MultiMatchCard[]>([]);
  const [rightCards, setRightCards] = useState<MultiMatchCard[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<MultiMatchCard | null>(null);
  const [connections, setConnections] = useState<Array<{ left: string; right: string }>>([]);
  const [session, setSession] = useState<StudySession>({
    deckId: deck.id,
    currentCardIndex: 0,
    isFlipped: false,
    correctCount: 0,
    incorrectCount: 0,
    startTime: new Date()
  });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    initializeCards();
  }, [deck]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const initializeCards = () => {
    // Take first 8 cards for multi-match mode
    const cardsToUse = deck.cards.slice(0, 8);
    
    const leftSide: MultiMatchCard[] = cardsToUse.map((card, index) => ({
      id: `${card.id}-front`,
      text: card.front,
      type: 'front',
      originalCardId: card.id,
      isMatched: false,
      isSelected: false,
      position: { x: 0, y: index * 80 }
    }));

    const rightSide: MultiMatchCard[] = cardsToUse
      .map((card, index) => ({
        id: `${card.id}-back`,
        text: card.back,
        type: 'back',
        originalCardId: card.id,
        isMatched: false,
        isSelected: false,
        position: { x: 0, y: index * 80 }
      }))
      .sort(() => Math.random() - 0.5); // Shuffle right side

    setLeftCards(leftSide);
    setRightCards(rightSide);
  };

  const handleLeftCardClick = (card: MultiMatchCard) => {
    if (card.isMatched) return;
    
    setSelectedLeft(card);
    setLeftCards(prev => prev.map(c => ({
      ...c,
      isSelected: c.id === card.id
    })));
  };

  const handleRightCardClick = (card: MultiMatchCard) => {
    if (!selectedLeft || card.isMatched) return;

    if (selectedLeft.originalCardId === card.originalCardId) {
      // Correct match!
      setLeftCards(prev => prev.map(c => 
        c.id === selectedLeft.id ? { ...c, isMatched: true, isSelected: false } : { ...c, isSelected: false }
      ));
      setRightCards(prev => prev.map(c => 
        c.id === card.id ? { ...c, isMatched: true } : c
      ));
      
      setConnections(prev => [...prev, { left: selectedLeft.id, right: card.id }]);
      setSession(prev => ({ ...prev, correctCount: prev.correctCount + 1 }));
      setStreak(prev => prev + 1);
      
      // Check if all cards are matched
      const allMatched = leftCards.every(c => c.id === selectedLeft.id || c.isMatched);
      if (allMatched) {
        setTimeout(() => setShowResults(true), 1000);
      }
    } else {
      // Incorrect match
      setSession(prev => ({ ...prev, incorrectCount: prev.incorrectCount + 1 }));
      setStreak(0);
      
      // Show error state briefly
      setRightCards(prev => prev.map(c => 
        c.id === card.id ? { ...c, isSelected: true } : c
      ));
      
      setTimeout(() => {
        setRightCards(prev => prev.map(c => ({ ...c, isSelected: false })));
        setLeftCards(prev => prev.map(c => ({ ...c, isSelected: false })));
      }, 1000);
    }
    
    setSelectedLeft(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    onComplete(session);
  };

  const handleRestart = () => {
    initializeCards();
    setSelectedLeft(null);
    setConnections([]);
    setSession({
      deckId: deck.id,
      currentCardIndex: 0,
      isFlipped: false,
      correctCount: 0,
      incorrectCount: 0,
      startTime: new Date()
    });
    setTimeElapsed(0);
    setShowResults(false);
    setStreak(0);
  };

  if (showResults) {
    const accuracy = session.correctCount + session.incorrectCount > 0 
      ? Math.round((session.correctCount / (session.correctCount + session.incorrectCount)) * 100)
      : 0;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
            <div className="mb-8">
              <div className="bg-purple-100 p-4 rounded-full inline-flex mb-4">
                <Trophy className="w-12 h-12 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Multi-Match Complete!
              </h1>
              <p className="text-gray-600">
                Excellent work connecting all the pairs!
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {session.correctCount}
                </div>
                <div className="text-xs text-gray-600">Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500 mb-2">
                  {session.incorrectCount}
                </div>
                <div className="text-xs text-gray-600">Misses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {formatTime(timeElapsed)}
                </div>
                <div className="text-xs text-gray-600">Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {accuracy}%
                </div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleComplete}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Continue
              </button>
              <button
                onClick={handleRestart}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const matchedCount = leftCards.filter(card => card.isMatched).length;
  const totalCards = leftCards.length;
  const progress = (matchedCount / totalCards) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Multi-Match Mode
            </h1>
            <p className="text-gray-600">
              {deck.name} • {matchedCount}/{totalCards} pairs matched
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center space-x-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                <Zap className="w-4 h-4" />
                <span>{streak} streak</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>{session.correctCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>{session.incorrectCount}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-full h-3 shadow-inner border border-gray-100">
            <div 
              className="bg-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Multi-Match Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">English</h3>
            {leftCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleLeftCardClick(card)}
                disabled={card.isMatched}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  card.isMatched
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default'
                    : card.isSelected
                    ? 'bg-purple-50 border-purple-300 text-purple-700 shadow-lg scale-105'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg text-gray-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{card.text}</span>
                  {card.isMatched && (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Translation</h3>
            {rightCards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleRightCardClick(card)}
                disabled={card.isMatched || !selectedLeft}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  card.isMatched
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default'
                    : card.isSelected
                    ? 'bg-red-50 border-red-300 text-red-700 shadow-lg'
                    : !selectedLeft
                    ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg text-gray-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{card.text}</span>
                  {card.isMatched && (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {selectedLeft 
              ? 'Now click on the matching translation on the right'
              : 'Click on an English word on the left to start matching'
            }
          </p>
        </div>
      </div>
    </div>
  );
}