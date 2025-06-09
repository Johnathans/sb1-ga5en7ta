import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Timer } from 'lucide-react';
import { Deck, StudySession, FlashCard } from '../types';

interface MatchModeProps {
  deck: Deck;
  onBack: () => void;
  onComplete: (session: StudySession) => void;
}

interface MatchCard {
  id: string;
  text: string;
  type: 'front' | 'back';
  originalCardId: string;
  isMatched: boolean;
  isSelected: boolean;
}

export function MatchMode({ deck, onBack, onComplete }: MatchModeProps) {
  const [matchCards, setMatchCards] = useState<MatchCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<MatchCard | null>(null);
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

  useEffect(() => {
    initializeMatchCards();
  }, [deck]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const initializeMatchCards = () => {
    const cards: MatchCard[] = [];
    
    // Take first 6 cards for match mode
    const cardsToUse = deck.cards.slice(0, 6);
    
    cardsToUse.forEach(card => {
      cards.push({
        id: `${card.id}-front`,
        text: card.front,
        type: 'front',
        originalCardId: card.id,
        isMatched: false,
        isSelected: false
      });
      cards.push({
        id: `${card.id}-back`,
        text: card.back,
        type: 'back',
        originalCardId: card.id,
        isMatched: false,
        isSelected: false
      });
    });

    // Shuffle the cards
    const shuffled = cards.sort(() => Math.random() - 0.5);
    setMatchCards(shuffled);
  };

  const handleCardClick = (card: MatchCard) => {
    if (card.isMatched || card.isSelected) return;

    if (!selectedCard) {
      // First card selection
      setSelectedCard(card);
      setMatchCards(prev => prev.map(c => 
        c.id === card.id ? { ...c, isSelected: true } : c
      ));
    } else {
      // Second card selection - check for match
      if (selectedCard.originalCardId === card.originalCardId && selectedCard.type !== card.type) {
        // Match found!
        setMatchCards(prev => prev.map(c => 
          c.originalCardId === card.originalCardId 
            ? { ...c, isMatched: true, isSelected: false }
            : { ...c, isSelected: false }
        ));
        setSession(prev => ({ ...prev, correctCount: prev.correctCount + 1 }));
        
        // Check if all cards are matched
        const allMatched = matchCards.every(c => 
          c.originalCardId === card.originalCardId || c.isMatched
        );
        
        if (allMatched) {
          setTimeout(() => setShowResults(true), 1000);
        }
      } else {
        // No match
        setSession(prev => ({ ...prev, incorrectCount: prev.incorrectCount + 1 }));
        
        // Show incorrect state briefly
        setMatchCards(prev => prev.map(c => 
          c.id === card.id ? { ...c, isSelected: true } : c
        ));
        
        setTimeout(() => {
          setMatchCards(prev => prev.map(c => ({ ...c, isSelected: false })));
        }, 1000);
      }
      
      setSelectedCard(null);
    }
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
    initializeMatchCards();
    setSelectedCard(null);
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
              <div className="bg-emerald-100 p-4 rounded-full inline-flex mb-4">
                <Trophy className="w-12 h-12 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Match Complete!
              </h1>
              <p className="text-gray-600">
                Great job matching all the pairs!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {session.correctCount}
                </div>
                <div className="text-sm text-gray-600">Matches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {session.incorrectCount}
                </div>
                <div className="text-sm text-gray-600">Misses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatTime(timeElapsed)}
                </div>
                <div className="text-sm text-gray-600">Time</div>
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

  const matchedCount = matchCards.filter(card => card.isMatched).length / 2;
  const totalPairs = matchCards.length / 2;
  const progress = (matchedCount / totalPairs) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
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
              Match Mode
            </h1>
            <p className="text-gray-600">
              {deck.name} • {matchedCount}/{totalPairs} pairs matched
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
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
              className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Match Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {matchCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 min-h-[120px] flex items-center justify-center text-center ${
                card.isMatched
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default'
                  : card.isSelected
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-lg scale-105'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg hover:scale-105 text-gray-900'
              }`}
            >
              <span className="font-semibold text-lg leading-tight">
                {card.text}
              </span>
              
              {card.isMatched && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Click on cards to match words with their translations
          </p>
        </div>
      </div>
    </div>
  );
}