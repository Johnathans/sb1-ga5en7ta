import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, MessageSquare, Play, Check, Plus, Volume2, Tag } from 'lucide-react';
import { Language, SentenceItem } from '../types';
import { sentenceData } from '../data/vocabularyData';

interface SentenceIndexProps {
  language: Language;
  onBack: () => void;
  onQuickStudy: (items: SentenceItem[]) => void;
  onMarkAsKnown: (itemId: string) => void;
  onAddToDeck: (items: SentenceItem[]) => void;
}

export function SentenceIndex({ 
  language, 
  onBack, 
  onQuickStudy, 
  onMarkAsKnown, 
  onAddToDeck 
}: SentenceIndexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const sentenceItems = sentenceData.filter(item => item.languageCode === language.code);
  
  const categories = useMemo(() => {
    const cats = new Set(sentenceItems.map(item => item.category));
    return Array.from(cats).sort();
  }, [sentenceItems]);

  const filteredItems = useMemo(() => {
    return sentenceItems.filter(item => {
      const matchesSearch = item.sentence.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.translation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [sentenceItems, searchTerm, selectedDifficulty, selectedCategory]);

  const handleItemSelect = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleCardClick = (item: SentenceItem, event: React.MouseEvent) => {
    // Don't trigger card selection if clicking on action buttons
    const target = event.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) {
      return;
    }
    handleItemSelect(item.id);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredItems.map(item => item.id)));
    }
  };

  const getSelectedItems = () => {
    return sentenceItems.filter(item => selectedItems.has(item.id));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
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
                  {language.name} Sentences
                </h1>
                <p className="text-gray-600">{filteredItems.length} sentences available</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          {selectedItems.size > 0 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onQuickStudy(getSelectedItems())}
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Quick Study ({selectedItems.size})</span>
              </button>
              <button
                onClick={() => onAddToDeck(getSelectedItems())}
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Deck</span>
              </button>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search sentences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Select All */}
            <button
              onClick={handleSelectAll}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-3 rounded-xl transition-colors"
            >
              {selectedItems.size === filteredItems.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>

        {/* Sentences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleCardClick(item, e)}
              className={`bg-white rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-xl cursor-pointer ${
                selectedItems.has(item.id) 
                  ? 'border-pink-300 ring-2 ring-pink-100 bg-pink-50' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start space-x-2 mb-3">
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                          {item.sentence}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-pink-600 transition-colors mt-1"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 font-medium">
                      {item.translation}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-pink-500 ml-4"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickStudy([item]);
                    }}
                    className="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-700 font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <Play className="w-4 h-4" />
                    <span>Study</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsKnown(item.id);
                    }}
                    className={`flex-1 font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 ${
                      item.isKnown
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{item.isKnown ? 'Known' : 'Mark Known'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No sentences found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}