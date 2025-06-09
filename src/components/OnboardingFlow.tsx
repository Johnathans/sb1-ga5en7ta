import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Target, Clock, BookOpen } from 'lucide-react';
import { Language, OnboardingData } from '../types';
import { languages } from '../data/languages';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onBack: () => void;
}

const INTERESTS = [
  'Travel & Tourism',
  'Business & Career',
  'Academic Studies',
  'Culture & History',
  'Food & Cooking',
  'Music & Entertainment',
  'Sports & Fitness',
  'Technology',
  'Art & Literature',
  'Family & Relationships',
  'News & Current Events',
  'Science & Nature'
];

const GOALS = [
  'Conversational fluency',
  'Professional communication',
  'Academic preparation',
  'Travel preparation',
  'Cultural understanding',
  'Personal enrichment'
];

const LEVELS = [
  { id: 'beginner', name: 'Beginner', description: 'Just starting out' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some basic knowledge' },
  { id: 'advanced', name: 'Advanced', description: 'Looking to improve' }
] as const;

const DAILY_GOALS = [
  { minutes: 5, label: '5 minutes', description: 'Quick daily practice' },
  { minutes: 15, label: '15 minutes', description: 'Steady progress' },
  { minutes: 30, label: '30 minutes', description: 'Serious learning' },
  { minutes: 60, label: '1 hour', description: 'Intensive study' }
];

export function OnboardingFlow({ onComplete, onBack }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    targetLanguage: null,
    interests: [],
    goal: '',
    level: 'beginner',
    dailyGoal: 15
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.targetLanguage !== null;
      case 2: return data.interests.length > 0;
      case 3: return data.goal !== '';
      case 4: return true; // level always has a default
      case 5: return true; // daily goal always has a default
      default: return false;
    }
  };

  const handleLanguageSelect = (language: Language) => {
    setData(prev => ({ ...prev, targetLanguage: language }));
  };

  const handleInterestToggle = (interest: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="bg-gray-100 p-4 rounded-full inline-flex mb-6">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Which language would you like to learn?
              </h2>
              <p className="text-gray-600 text-lg">
                Choose your target language to get started with personalized content
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                    data.targetLanguage?.code === language.code
                      ? 'border-gray-900 bg-gray-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-sm mb-3">
                    {language.flag}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{language.name}</h3>
                  <p className="text-sm text-gray-500">{language.nativeName}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="bg-gray-100 p-4 rounded-full inline-flex mb-6">
                <BookOpen className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What topics interest you?
              </h2>
              <p className="text-gray-600 text-lg">
                Select areas you'd like to focus on (choose at least one)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    data.interests.includes(interest)
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{interest}</span>
                    {data.interests.includes(interest) && (
                      <CheckCircle className="w-5 h-5 text-gray-900" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="bg-gray-100 p-4 rounded-full inline-flex mb-6">
                <Target className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What's your main goal?
              </h2>
              <p className="text-gray-600 text-lg">
                This helps us recommend the best learning path for you
              </p>
            </div>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              {GOALS.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setData(prev => ({ ...prev, goal }))}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    data.goal === goal
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{goal}</span>
                    {data.goal === goal && (
                      <CheckCircle className="w-5 h-5 text-gray-900" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="bg-gray-100 p-4 rounded-full inline-flex mb-6">
                <BookOpen className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What's your current level?
              </h2>
              <p className="text-gray-600 text-lg">
                Help us tailor the difficulty to your experience
              </p>
            </div>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setData(prev => ({ ...prev, level: level.id }))}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    data.level === level.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{level.name}</h3>
                      <p className="text-gray-600">{level.description}</p>
                    </div>
                    {data.level === level.id && (
                      <CheckCircle className="w-5 h-5 text-gray-900" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="bg-gray-100 p-4 rounded-full inline-flex mb-6">
                <Clock className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How much time can you dedicate daily?
              </h2>
              <p className="text-gray-600 text-lg">
                Set a realistic goal to build a consistent learning habit
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {DAILY_GOALS.map((goal) => (
                <button
                  key={goal.minutes}
                  onClick={() => setData(prev => ({ ...prev, dailyGoal: goal.minutes }))}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                    data.dailyGoal === goal.minutes
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{goal.label}</div>
                    <p className="text-gray-600">{goal.description}</p>
                  </div>
                  {data.dailyGoal === goal.minutes && (
                    <CheckCircle className="w-5 h-5 text-gray-900 mx-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar 
        onGetStarted={() => {}}
        onLogin={() => {}}
        onSignUp={() => {}}
      />
      
      <div className="flex-1 bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">Setup Your Profile</h1>
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-xl transition-colors"
            >
              <span>{currentStep === totalSteps ? 'Complete Setup' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}