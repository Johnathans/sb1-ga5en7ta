import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Settings } from 'lucide-react';
import { Story, StoryLine } from '../types';

interface StoryReaderProps {
  story: Story;
  onBack: () => void;
  onComplete: () => void;
}

export function StoryReader({ story, onBack, onComplete }: StoryReaderProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentLine = story.lines[currentLineIndex];
  const progress = ((currentLineIndex + 1) / story.lines.length) * 100;

  useEffect(() => {
    // Simulate audio loading and time updates
    const interval = setInterval(() => {
      if (isPlaying && autoAdvance) {
        // Simulate line completion after 3 seconds
        setTimeout(() => {
          handleNextLine();
        }, 3000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, currentLineIndex, autoAdvance]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the audio element
  };

  const handleNextLine = () => {
    if (currentLineIndex < story.lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
      setShowTranslation(false);
    } else {
      // Story completed
      setIsPlaying(false);
      onComplete();
    }
  };

  const handlePreviousLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
      setShowTranslation(false);
    }
  };

  const handleLineSelect = (index: number) => {
    setCurrentLineIndex(index);
    setShowTranslation(false);
  };

  const handlePlayLineAudio = (line: StoryLine) => {
    // In a real implementation, this would play the specific line audio
    console.log('Playing line audio:', line.text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{story.title}</h1>
                <p className="text-sm text-gray-600">
                  Line {currentLineIndex + 1} of {story.lines.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  showTranslation 
                    ? 'bg-pink-100 text-pink-700 border border-pink-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Translation
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Story Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Current Line Display */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="text-center">
                <div className="mb-6">
                  <p className="text-3xl font-semibold text-gray-900 leading-relaxed mb-4">
                    {currentLine.text}
                  </p>
                  
                  {showTranslation && (
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {currentLine.translation}
                    </p>
                  )}
                </div>

                {/* Audio Controls */}
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <button
                    onClick={handlePreviousLine}
                    disabled={currentLineIndex === 0}
                    className="p-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-full transition-colors"
                  >
                    <SkipBack className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    className="p-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:shadow-pink-200"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </button>

                  <button
                    onClick={handleNextLine}
                    disabled={currentLineIndex === story.lines.length - 1}
                    className="p-3 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 rounded-full transition-colors"
                  >
                    <SkipForward className="w-6 h-6" />
                  </button>
                </div>

                {/* Line-specific Audio */}
                <button
                  onClick={() => handlePlayLineAudio(currentLine)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Repeat Line</span>
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Playback Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Playback Speed
                  </label>
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value={0.5}>0.5x (Slow)</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x (Normal)</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x (Fast)</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoAdvance"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <label htmlFor="autoAdvance" className="ml-2 text-sm text-gray-700">
                    Auto-advance lines
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Story Lines Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Story Lines</h3>
              <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                {story.lines.map((line, index) => (
                  <button
                    key={line.id}
                    onClick={() => handleLineSelect(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      index === currentLineIndex
                        ? 'bg-pink-50 border-2 border-pink-200 text-pink-900'
                        : index < currentLineIndex
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-xs font-medium text-gray-500 mt-1 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-relaxed mb-2">
                          {line.text}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {line.translation}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayLineAudio(line);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 mt-1"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element for future implementation */}
      <audio
        ref={audioRef}
        src={story.audioUrl}
        onTimeUpdate={() => {
          // Handle time updates for line synchronization
        }}
        onEnded={() => {
          setIsPlaying(false);
        }}
      />
    </div>
  );
}