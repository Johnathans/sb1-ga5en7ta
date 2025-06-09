import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Play, Clock, BookOpen, Volume2, CheckCircle, Star } from 'lucide-react';
import { Language, Story } from '../types';
import { storiesData } from '../data/storiesData';

interface StoriesIndexProps {
  language: Language;
  onBack: () => void;
  onReadStory: (story: Story) => void;
}

export function StoriesIndex({ language, onBack, onReadStory }: StoriesIndexProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const stories = storiesData.filter(story => story.languageCode === language.code);
  
  const categories = useMemo(() => {
    const cats = new Set(stories.map(story => story.category));
    return Array.from(cats).sort();
  }, [stories]);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || story.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [stories, searchTerm, selectedDifficulty, selectedCategory]);

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
                  {language.name} Stories
                </h1>
                <p className="text-gray-600">{filteredStories.length} interactive stories available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Story Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Large Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => onReadStory(story)}
                    className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all duration-300 group-hover:shadow-pink-200"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>

                {/* Completion Badge */}
                {story.isCompleted && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-emerald-500 text-white rounded-full p-2 shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                )}

                {/* Difficulty Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getDifficultyColor(story.difficulty)}`}>
                    {story.difficulty}
                  </span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {story.description}
                  </p>
                </div>

                {/* Story Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{story.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{story.lines.length} lines</span>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {story.category}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => onReadStory(story)}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Play className="w-4 h-4" />
                    <span>Read Story</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Indicator */}
                {story.isCompleted && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No stories found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter criteria to discover more stories
            </p>
          </div>
        )}

        {/* Featured Section */}
        {filteredStories.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Interactive Audio Stories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Each story features line-by-line audio narration to help you improve your pronunciation 
                and listening comprehension. Follow along with native speakers and immerse yourself 
                in authentic {language.name} content.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}