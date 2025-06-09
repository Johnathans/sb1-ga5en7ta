import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Timer, Eye, EyeOff } from 'lucide-react';
import { Deck, StudySession } from '../types';

interface ClozeQuestion {
  id: string;
  sentence: string;
  blanks: Array<{
    word: string;
    position: number;
    userAnswer: string;
    isCorrect: boolean | null;
  }>;
  originalCard: { front: string; back: string };
}

interface ClozeModeProps {
  deck: Deck;
  onBack: () => void;
  onComplete: (session: StudySession) => void;
}

export function ClozeMode({ deck, onBack, onComplete }: ClozeModeProps) {
  const [questions, setQuestions] = useState<ClozeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    generateClozeQuestions();
  }, [deck]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateClozeQuestions = () => {
    const clozeQuestions: ClozeQuestion[] = deck.cards.slice(0, 10).map((card, index) => {
      // Create sentences using the card content
      const sentences = [
        `The word "${card.front}" means ${card.back}.`,
        `In this language, "${card.front}" translates to ${card.back}.`,
        `When you say "${card.front}", you mean ${card.back}.`,
        `The translation of "${card.front}" is ${card.back}.`,
        `"${card.front}" can be translated as ${card.back}.`
      ];
      
      const selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];
      
      // Determine which word to blank out (randomly choose front or back)
      const blankFront = Math.random() > 0.5;
      const wordToBlank = blankFront ? card.front : card.back;
      const position = selectedSentence.indexOf(`"${wordToBlank}"`);
      
      return {
        id: `cloze-${index}`,
        sentence: selectedSentence.replace(`"${wordToBlank}"`, '______'),
        blanks: [{
          word: wordToBlank,
          position,
          userAnswer: '',
          isCorrect: null
        }],
        originalCard: card
      };
    });

    setQuestions(clozeQuestions);
  };

  const handleAnswerChange = (blankIndex: number, value: string) => {
    setQuestions(prev => prev.map((q, qIndex) => 
      qIndex === currentQuestionIndex 
        ? {
            ...q,
            blanks: q.blanks.map((blank, bIndex) => 
              bIndex === blankIndex 
                ? { ...blank, userAnswer: value, isCorrect: null }
                : blank
            )
          }
        : q
    ));
  };

  const checkAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let correctCount = 0;
    let incorrectCount = 0;

    const updatedQuestion = {
      ...currentQuestion,
      blanks: currentQuestion.blanks.map(blank => {
        const isCorrect = blank.userAnswer.toLowerCase().trim() === blank.word.toLowerCase();
        if (isCorrect) correctCount++;
        else incorrectCount++;
        
        return { ...blank, isCorrect };
      })
    };

    setQuestions(prev => prev.map((q, index) => 
      index === currentQuestionIndex ? updatedQuestion : q
    ));

    setSession(prev => ({
      ...prev,
      correctCount: prev.correctCount + correctCount,
      incorrectCount: prev.incorrectCount + incorrectCount
    }));

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex + 1 >= questions.length) {
        setShowResults(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 2000);
  };

  const canSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return currentQuestion?.blanks.every(blank => blank.userAnswer.trim() !== '');
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
    generateClozeQuestions();
    setCurrentQuestionIndex(0);
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
    setShowHints(false);
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
              <div className="bg-pink-100 p-4 rounded-full inline-flex mb-4">
                <Trophy className="w-12 h-12 text-pink-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Cloze Test Complete!
              </h1>
              <p className="text-gray-600">
                Well done filling in all the blanks!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {session.correctCount}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {session.incorrectCount}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {accuracy}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
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
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating cloze questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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
              Cloze Test
            </h1>
            <p className="text-gray-600">
              {deck.name} • Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>Hints</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-full h-3 shadow-inner border border-gray-100">
            <div 
              className="bg-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Fill in the blank
            </h2>
            
            {/* Sentence with blank */}
            <div className="text-xl leading-relaxed text-gray-800 mb-8">
              {currentQuestion.sentence.split('______').map((part, index) => (
                <span key={index}>
                  {part}
                  {index < currentQuestion.blanks.length && (
                    <span className="inline-block mx-2">
                      <input
                        type="text"
                        value={currentQuestion.blanks[index].userAnswer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className={`border-b-2 bg-transparent text-center font-semibold px-2 py-1 min-w-[120px] focus:outline-none transition-colors ${
                          currentQuestion.blanks[index].isCorrect === null
                            ? 'border-gray-300 focus:border-pink-500'
                            : currentQuestion.blanks[index].isCorrect
                            ? 'border-emerald-500 text-emerald-700'
                            : 'border-red-500 text-red-700'
                        }`}
                        placeholder="____"
                        disabled={currentQuestion.blanks[index].isCorrect !== null}
                      />
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Hints */}
            {showHints && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Hint:</h3>
                <p className="text-blue-800">
                  Original pair: "{currentQuestion.originalCard.front}" ↔ "{currentQuestion.originalCard.back}"
                </p>
              </div>
            )}

            {/* Feedback */}
            {currentQuestion.blanks.some(blank => blank.isCorrect !== null) && (
              <div className="mb-6">
                {currentQuestion.blanks.map((blank, index) => (
                  <div key={index} className="mb-2">
                    {blank.isCorrect ? (
                      <div className="flex items-center justify-center space-x-2 text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>Correct!</span>
                      </div>
                    ) : (
                      <div className="text-red-600">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <XCircle className="w-5 h-5" />
                          <span>Incorrect</span>
                        </div>
                        <p className="text-sm">
                          Correct answer: <span className="font-semibold">{blank.word}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            {currentQuestion.blanks.every(blank => blank.isCorrect === null) && (
              <button
                onClick={checkAnswer}
                disabled={!canSubmit()}
                className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Check Answer
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-gray-600">
            Type the missing word to complete the sentence
          </p>
        </div>
      </div>
    </div>
  );
}