import React from 'react';
import { Globe, BookOpen, TrendingUp, Users } from 'lucide-react';
import { languages } from '../data/languages';
import { Language, Deck } from '../types';

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
  decks: Deck[];
  isHomepage?: boolean;
}

export function LanguageSelector({ onLanguageSelect, decks, isHomepage = false }: LanguageSelectorProps) {
  const getLanguageDeckCount = (languageCode: string) => {
    return decks.filter(deck => deck.languageCode === languageCode).length;
  };

  const getLanguageStats = (languageCode: string) => {
    const languageDecks = decks.filter(deck => deck.languageCode === languageCode);
    const totalCards = languageDecks.reduce((sum, deck) => sum + deck.cards.length, 0);
    return { decks: languageDecks.length, cards: totalCards };
  };

  if (isHomepage) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {languages.map((language) => {
          const stats = getLanguageStats(language.code);
          return (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language)}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Content */}
              <div className="relative z-10">
                <div className="text-center">
                  {/* Language code with modern styling */}
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-900 flex items-center justify-center text-white font-bold text-lg transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {language.flag}
                    </div>
                  </div>
                  
                  {/* Language name */}
                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {language.name}
                  </h3>
                  
                  {/* Native name */}
                  <p className="text-sm text-gray-500 mb-4 font-medium">
                    {language.nativeName}
                  </p>
                  
                  {/* Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span className="font-medium">{stats.decks} decks</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{stats.cards} cards</span>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                      <span>Ready to learn</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <Globe className="w-12 h-12 text-pink-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Flipped Lingo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master languages with interactive flashcards. Choose from 20 popular languages and start your learning journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {languages.map((language) => {
            const deckCount = getLanguageDeckCount(language.code);
            return (
              <button
                key={language.code}
                onClick={() => onLanguageSelect(language)}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-pink-300"
              >
                <div className="text-center">
                  <div className="mb-3">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                      {language.flag}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {language.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {language.nativeName}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{deckCount} deck{deckCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}