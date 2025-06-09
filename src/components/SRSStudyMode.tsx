import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Brain, Zap, ThumbsUp, Clock, Target, TrendingUp, RotateCcw, Star, CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { Deck, StudySession, SRSReviewResult, FlashCard } from '../types';
import { srsService } from '../services/srsService';

interface SRSStudyModeProps {
  deck: Deck;
  onBack: () => void;
  onComplete: (session: StudySession) => void;
}

type QualityRating = 0 | 1 | 2 | 3 | 4 | 5;

export function SRSStudyMode({ deck, onBack, onComplete }: SRSStudyModeProps) {
  const [studyCards, setStudyCards] = useState<FlashCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [session, setSession] = useState<StudySession>({
    deckId: deck.id,
    currentCardIndex: 0,
    isFlipped: false,
    correctCount: 0,
    incorrectCount: 0,
    startTime: new Date(),
    srsMode: true,
    reviewedCards: []
  });
  const [showResults, setShowResults] = useState(false);
  const [cardStartTime, setCardStartTime] = useState<Date>(new Date());

  useEffect(() => {
    initializeStudySession();
  }, [deck]);

  const initializeStudySession = () => {
    // Initialize SRS data for all cards if not present
    const initializedCards = deck.cards.map(card => srsService.initializeCard(card));
    
    // Get optimal study session
    const sessionCards = srsService.getOptimalStudySession(initializedCards, 15);
    
    setStudyCards(sessionCards);
    setCardStartTime(new Date());
  };

  const currentCard = studyCards[currentCardIndex];
  const progress = studyCards.length > 0 ? ((currentCardIndex + 1) / studyCards.length) * 100 : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleQualityRating = (quality: QualityRating) => {
    if (!currentCard) return;

    const timeSpent = Math.round((new Date().getTime() - cardStartTime.getTime()) / 1000);
    const { updatedCard, reviewResult } = srsService.calculateNextReview(currentCard, quality);

    // Update the review result with time spent
    const completeReviewResult: SRSReviewResult = {
      ...reviewResult,
      timeSpent
    };

    // Update session data
    setSession(prev => ({
      ...prev,
      correctCount: quality >= 3 ? prev.correctCount + 1 : prev.correctCount,
      incorrectCount: quality < 3 ? prev.incorrectCount + 1 : prev.incorrectCount,
      reviewedCards: [...(prev.reviewedCards || []), completeReviewResult]
    }));

    // Update the card in the study set
    setStudyCards(prev => prev.map((card, index) => 
      index === currentCardIndex ? updatedCard : card
    ));

    // Move to next card or finish
    setTimeout(() => {
      if (currentCardIndex + 1 >= studyCards.length) {
        setShowResults(true);
      } else {
        setCurrentCardIndex(prev => prev + 1);
        setIsFlipped(false);
        setCardStartTime(new Date());
      }
    }, 1000);
  };

  const handleComplete = () => {
    // Save updated cards back to deck (this would typically go to a backend)
    const updatedDeck = {
      ...deck,
      cards: deck.cards.map(originalCard => {
        const studiedCard = studyCards.find(sc => sc.id === originalCard.id);
        return studiedCard || originalCard;
      })
    };

    // Save to localStorage for persistence
    const existingDecks = JSON.parse(localStorage.getItem('flipped-lingo-decks') || '[]');
    const updatedDecks = existingDecks.map((d: Deck) => 
      d.id === deck.id ? updatedDeck : d
    );
    localStorage.setItem('flipped-lingo-decks', JSON.stringify(updatedDecks));

    onComplete(session);
  };

  const handleRestart = () => {
    initializeStudySession();
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSession({
      deckId: deck.id,
      currentCardIndex: 0,
      isFlipped: false,
      correctCount: 0,
      incorrectCount: 0,
      startTime: new Date(),
      srsMode: true,
      reviewedCards: []
    });
    setShowResults(false);
    setCardStartTime(new Date());
  };

  const qualityOptions = [
    {
      rating: 0 as QualityRating,
      label: 'Complete Blackout',
      description: 'No memory of the answer',
      icon: XCircle,
      shortLabel: 'Blackout'
    },
    {
      rating: 1 as QualityRating,
      label: 'Incorrect',
      description: 'Wrong answer, but familiar',
      icon: XCircle,
      shortLabel: 'Wrong'
    },
    {
      rating: 2 as QualityRating,
      label: 'Incorrect (Easy)',
      description: 'Wrong, but correct seemed easy',
      icon: Brain,
      shortLabel: 'Wrong (Easy)'
    },
    {
      rating: 3 as QualityRating,
      label: 'Correct (Hard)',
      description: 'Correct with serious difficulty',
      icon: ThumbsUp,
      shortLabel: 'Hard'
    },
    {
      rating: 4 as QualityRating,
      label: 'Correct',
      description: 'Correct with some hesitation',
      icon: CheckCircle,
      shortLabel: 'Good'
    },
    {
      rating: 5 as QualityRating,
      label: 'Perfect',
      description: 'Perfect response, very easy',
      icon: Star,
      shortLabel: 'Perfect'
    }
  ];

  if (studyCards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
            <div className="bg-gray-100 p-6 rounded-full inline-flex mb-8">
              <Target className="w-12 h-12 text-gray-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              No Cards Due for Review
            </h1>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Excellent work! You've completed all your reviews for now. Come back later for more practice.
            </p>
            <button
              onClick={onBack}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Back to Deck
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const stats = srsService.calculateStats(studyCards);
    const sessionTime = Math.round((new Date().getTime() - session.startTime.getTime()) / 60000);

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
            <div className="mb-12">
              <div className="bg-gray-100 p-6 rounded-full inline-flex mb-6">
                <Trophy className="w-16 h-16 text-gray-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                SRS Session Complete!
              </h1>
              <p className="text-gray-600 text-xl">
                Your spaced repetition data has been updated
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {session.correctCount}
                </div>
                <div className="text-sm text-gray-600 font-medium">Correct</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {session.incorrectCount}
                </div>
                <div className="text-sm text-gray-600 font-medium">Incorrect</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {sessionTime}m
                </div>
                <div className="text-sm text-gray-600 font-medium">Time Spent</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {Math.round(stats.retentionRate)}%
                </div>
                <div className="text-sm text-gray-600 font-medium">Retention</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-12 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Next Review Schedule</h3>
              <div className="space-y-3">
                {session.reviewedCards?.slice(0, 3).map((review, index) => {
                  const card = studyCards.find(c => c.id === review.cardId);
                  const nextReview = card?.srsData?.nextReviewDate;
                  const daysUntil = nextReview ? Math.ceil((nextReview.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
                  
                  return (
                    <div key={review.cardId} className="flex justify-between items-center text-gray-700 bg-white rounded-lg p-3">
                      <span className="font-medium">Card {index + 1}</span>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                        {daysUntil === 0 ? 'Today' : `${daysUntil} day${daysUntil !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleComplete}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Continue
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Study More Cards</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Smart Review
                </h1>
                <p className="text-gray-600">
                  Card {currentCardIndex + 1} of {studyCards.length} • {deck.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gray-900 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* SRS Info Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <Brain className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {currentCard?.srsData?.isNew ? 'New Card' : 'Review Card'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {currentCard?.srsData?.isNew 
                    ? 'Learning for the first time' 
                    : `Interval: ${currentCard?.srsData?.interval || 0} days`
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {currentCard?.srsData?.totalReviews || 0}
              </div>
              <div className="text-xs text-gray-600">Reviews</div>
            </div>
          </div>
        </div>

        {/* Large Flashcard */}
        <div className="mb-8">
          <div className="relative w-full max-w-3xl mx-auto" style={{ perspective: '1000px' }}>
            <div 
              className={`relative w-full h-80 cursor-pointer transition-transform duration-700 ease-out ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
              onClick={handleFlip}
            >
              {/* Front of card */}
              <div 
                className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center p-8 hover:shadow-3xl transition-shadow duration-300"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)'
                }}
              >
                <div className="text-center flex-1 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                    {currentCard?.front}
                  </h2>
                  
                  <div className="bg-gray-50 rounded-2xl p-4 inline-flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <p className="text-gray-600 font-medium">
                      Tap to reveal answer
                    </p>
                  </div>
                </div>

                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-6 right-6 p-3 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 rounded-full hover:bg-gray-100"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>

              {/* Back of card */}
              <div 
                className="absolute inset-0 w-full h-full bg-gray-900 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 hover:shadow-3xl transition-shadow duration-300"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-center flex-1 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-white mb-8 leading-tight">
                    {currentCard?.back}
                  </h2>
                  
                  <div className="bg-white/10 rounded-2xl p-4 inline-flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
                    <p className="text-white/80 font-medium">
                      How well did you know this?
                    </p>
                  </div>
                </div>

                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-6 right-6 p-3 text-white/60 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Rating Buttons */}
        {isFlipped && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Rate Your Knowledge
              </h3>
              <p className="text-gray-600 text-lg">
                Your rating determines when you'll see this card again
              </p>
            </div>
            
            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {qualityOptions.map((option) => (
                <button
                  key={option.rating}
                  onClick={() => handleQualityRating(option.rating)}
                  className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg text-left transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-xl bg-gray-100">
                      <option.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1 text-gray-900">
                        {option.shortLabel}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-gray-400">
                      {option.rating}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* SRS Explanation */}
            <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 mt-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-200 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Smart Spacing Algorithm</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Cards you find difficult will appear more frequently, while easy cards are spaced further apart. 
                    This maximizes your learning efficiency and long-term retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}