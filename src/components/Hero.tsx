import React from 'react';
import { Play, Star, Users, BookOpen, Zap } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-pink-50 border border-pink-200 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-pink-600 fill-current" />
            <span className="text-sm font-medium text-pink-700">Trusted by 50,000+ learners worldwide</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Master Any Language with
            <span className="text-pink-600"> Smart Flashcards</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Learn 20 popular languages through interactive flashcards. Build custom decks, track your progress, and achieve fluency faster than ever before.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={onGetStarted}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <span>Start Learning Free</span>
              <Play className="w-5 h-5" />
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">20</div>
              <div className="text-gray-600">Languages</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Zap className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}