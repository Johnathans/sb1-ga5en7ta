import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { Language, Deck, FlashCard } from '../types';

interface DeckCreatorProps {
  language: Language;
  deck?: Deck;
  onBack: () => void;
  onSave: (deck: Omit<Deck, 'id' | 'createdAt'>) => void;
}

export function DeckCreator({ language, deck, onBack, onSave }: DeckCreatorProps) {
  const [name, setName] = useState(deck?.name || '');
  const [description, setDescription] = useState(deck?.description || '');
  const [cards, setCards] = useState<FlashCard[]>(
    deck?.cards || [{ id: '1', front: '', back: '' }]
  );

  const addCard = () => {
    const newCard: FlashCard = {
      id: Date.now().toString(),
      front: '',
      back: ''
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (cardId: string) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const updateCard = (cardId: string, field: 'front' | 'back', value: string) => {
    setCards(cards.map(card => 
      card.id === cardId ? { ...card, [field]: value } : card
    ));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    
    const validCards = cards.filter(card => card.front.trim() && card.back.trim());
    if (validCards.length === 0) return;

    const deckData: Omit<Deck, 'id' | 'createdAt'> = {
      name: name.trim(),
      description: description.trim(),
      languageCode: language.code,
      cards: validCards,
      isBuiltIn: false,
      progress: deck?.progress || { studied: 0, mastered: 0 },
      studiedAt: deck?.studiedAt
    };

    onSave(deckData);
  };

  const canSave = name.trim() && cards.some(card => card.front.trim() && card.back.trim());

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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
                  {deck ? 'Edit Deck' : 'Create New Deck'}
                </h1>
                <p className="text-gray-600">{language.name}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Deck</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Deck Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter deck name..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Cards ({cards.length})
              </h2>
              <button
                onClick={addCard}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card</span>
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cards.map((card, index) => (
                <div key={card.id} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      Card {index + 1}
                    </span>
                    {cards.length > 1 && (
                      <button
                        onClick={() => removeCard(card.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Front (English)
                      </label>
                      <input
                        type="text"
                        value={card.front}
                        onChange={(e) => updateCard(card.id, 'front', e.target.value)}
                        placeholder="Enter English word/phrase..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Back ({language.name})
                      </label>
                      <input
                        type="text"
                        value={card.back}
                        onChange={(e) => updateCard(card.id, 'back', e.target.value)}
                        placeholder={`Enter ${language.name} translation...`}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Add at least one complete card pair to save your deck
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}