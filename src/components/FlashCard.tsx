import React from 'react';
import { Volume2 } from 'lucide-react';
import { FlashCard as FlashCardType } from '../types';

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto" style={{ perspective: '1000px' }}>
      <div 
        className={`relative w-full h-80 cursor-pointer transition-transform duration-700 ease-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
        }}
        onClick={onFlip}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center p-8 hover:shadow-xl transition-shadow duration-300"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className="text-center flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 leading-tight">
              {card.front}
            </h2>
            
            <p className="text-gray-500 text-sm font-medium">
              Tap to reveal
            </p>
          </div>

          <button 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full bg-gray-900 rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 hover:shadow-xl transition-shadow duration-300"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="text-center flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-white mb-6 leading-tight">
              {card.back}
            </h2>
            
            <p className="text-white/60 text-sm font-medium">
              Tap to flip back
            </p>
          </div>

          <button 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}