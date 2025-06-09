import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { LanguageSelector } from './LanguageSelector';
import { Footer } from './Footer';
import { Language, Deck } from '../types';

interface HomepageProps {
  onLanguageSelect: (language: Language) => void;
  decks: Deck[];
  onLogin: () => void;
  onSignUp: () => void;
}

export function Homepage({ onLanguageSelect, decks, onLogin, onSignUp }: HomepageProps) {
  const handleGetStarted = () => {
    // Scroll to language selector
    const languageSection = document.getElementById('language-selector');
    if (languageSection) {
      languageSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onGetStarted={handleGetStarted}
        onLogin={onLogin}
        onSignUp={onSignUp}
      />
      <Hero onGetStarted={handleGetStarted} />
      
      {/* Language Selector Section */}
      <div id="language-selector" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">20 Languages Available</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Language
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Start your language learning journey with any of our supported languages. 
              Each comes with carefully crafted flashcard decks designed by language experts.
            </p>
          </div>
          
          <LanguageSelector 
            onLanguageSelect={onLanguageSelect} 
            decks={decks}
            isHomepage={true}
          />
          
          {/* Additional CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              Can't find your language? We're constantly adding new languages based on user demand.
            </p>
            <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-xl border border-gray-200 hover:border-pink-300 transition-all duration-200 shadow-lg hover:shadow-xl">
              Request a Language
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}