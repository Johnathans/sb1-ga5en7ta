import React from 'react';
import { Brain, Zap, Target, RotateCcw, Users, FileText, TrendingUp, ArrowLeft, Star } from 'lucide-react';

export type StudyMode = 'flashcards' | 'srs' | 'match' | 'multi-match' | 'cloze';

interface StudyModeSelectorProps {
  onModeSelect: (mode: StudyMode) => void;
  onBack: () => void;
  deckName: string;
  cardCount: number;
}

export function StudyModeSelector({ onModeSelect, onBack, deckName, cardCount }: StudyModeSelectorProps) {
  const studyModes = [
    {
      id: 'srs' as StudyMode,
      name: 'Smart Review',
      description: 'AI-powered spaced repetition that adapts to your memory',
      icon: TrendingUp,
      difficulty: 'Recommended',
      time: '10-20 min',
      features: ['Adaptive intervals', 'Long-term retention', 'Personalized difficulty'],
      recommended: true
    },
    {
      id: 'flashcards' as StudyMode,
      name: 'Classic Cards',
      description: 'Traditional flip-card study method',
      icon: RotateCcw,
      difficulty: 'Beginner Friendly',
      time: '5-10 min',
      features: ['Simple interface', 'Self-paced', 'Immediate feedback']
    },
    {
      id: 'match' as StudyMode,
      name: 'Match Game',
      description: 'Match words with their translations',
      icon: Target,
      difficulty: 'Interactive',
      time: '3-7 min',
      features: ['Memory training', 'Visual learning', 'Quick sessions']
    },
    {
      id: 'multi-match' as StudyMode,
      name: 'Multi-Match',
      description: 'Connect multiple pairs simultaneously',
      icon: Users,
      difficulty: 'Challenge',
      time: '5-12 min',
      features: ['Advanced matching', 'Pattern recognition', 'Strategic thinking']
    },
    {
      id: 'cloze' as StudyMode,
      name: 'Fill Blanks',
      description: 'Complete sentences with missing words',
      icon: FileText,
      difficulty: 'Advanced',
      time: '7-15 min',
      features: ['Context learning', 'Sentence structure', 'Active recall']
    }
  ];

  const recommendedMode = studyModes.find(mode => mode.recommended);
  const otherModes = studyModes.filter(mode => !mode.recommended);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Choose Study Mode
              </h1>
              <p className="text-gray-600 mt-1">
                {deckName} • {cardCount} cards
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Recommended Mode */}
        {recommendedMode && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="w-5 h-5 text-pink-600" />
              <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
            </div>
            
            <button
              onClick={() => onModeSelect(recommendedMode.id)}
              className="group w-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-pink-300 text-left"
            >
              <div className="flex items-start space-x-6">
                {/* Icon */}
                <div className="bg-pink-600 p-4 rounded-xl group-hover:bg-pink-700 transition-colors">
                  <recommendedMode.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {recommendedMode.name}
                    </h3>
                    <span className="bg-pink-100 text-pink-700 text-xs font-medium px-2 py-1 rounded-full">
                      {recommendedMode.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {recommendedMode.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {recommendedMode.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{recommendedMode.time}</span>
                    <span>•</span>
                    <span>Optimal for retention</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-pink-100 transition-colors">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-pink-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Other Study Methods */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Other Study Methods
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => onModeSelect(mode.id)}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 text-left"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-gray-200 transition-colors">
                    <mode.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">{mode.difficulty}</div>
                    <div className="text-xs text-gray-500">{mode.time}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {mode.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {mode.description}
                  </p>
                  
                  {/* Features */}
                  {mode.features && (
                    <div className="space-y-1">
                      {mode.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400" />
                          <span className="text-xs text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Tap to start
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-all duration-200">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl p-8 border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="bg-pink-100 p-3 rounded-lg">
              <Brain className="w-6 h-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About Smart Review
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Smart Review uses scientifically-proven spaced repetition algorithms to optimize your learning. 
                Cards you find difficult appear more frequently, while easy cards are spaced further apart, 
                maximizing retention with minimal study time.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 rounded-full bg-pink-500" />
                  <span>Based on cognitive psychology research</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 rounded-full bg-pink-500" />
                  <span>Proven to increase retention by 200%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 rounded-full bg-pink-500" />
                  <span>Adapts to your individual learning pace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}