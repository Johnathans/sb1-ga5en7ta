import React, { useState } from 'react';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { Language, Deck } from '../types';
import { getLanguageByCode } from '../data/languages';
import { DeckCard } from './DeckCard';

interface DeckBrowserProps {
  language: Language;
  decks: Deck[];
  onBack: () => void;
  onStudy: (deck: Deck) => void;
  onCreateDeck: () => void;
  onEditDeck?: (deck: Deck) => void;
}

export function DeckBrowser({ 
  language, 
  decks, 
  onBack, 
  onStudy, 
  onCreateDeck,
  onEditDeck 
}: DeckBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const languageDecks = decks.filter(deck => deck.languageCode === language.code);
  const filteredDecks = languageDecks.filter(deck =>
    deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const builtInDecks = filteredDecks.filter(deck => deck.isBuiltIn);
  const customDecks = filteredDecks.filter(deck => !deck.isBuiltIn);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
                {language.flag}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {language.name}
                </h1>
                <p className="text-gray-600">{language.nativeName}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onCreateDeck}
            className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Deck</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search decks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {builtInDecks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Built-in Decks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builtInDecks.map(deck => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onStudy={onStudy}
                />
              ))}
            </div>
          </div>
        )}

        {customDecks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Decks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customDecks.map(deck => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  onStudy={onStudy}
                  onEdit={onEditDeck}
                />
              ))}
            </div>
          </div>
        )}

        {filteredDecks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? 'No decks found' : 'No decks available'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Create your first deck to get started'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={onCreateDeck}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Create Your First Deck
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}