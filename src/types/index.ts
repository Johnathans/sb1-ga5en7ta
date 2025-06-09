export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  srsData?: SRSCardData;
}

export interface SRSCardData {
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
  easeFactor: number; // Multiplier for interval calculation (1.3 - 2.5)
  nextReviewDate: Date; // When this card should be reviewed next
  lastReviewDate?: Date; // When this card was last reviewed
  quality: number; // Last review quality (0-5)
  isNew: boolean; // Whether this card has been reviewed before
  totalReviews: number; // Total number of times reviewed
  correctStreak: number; // Current streak of correct answers
  averageQuality: number; // Average quality across all reviews
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  languageCode: string;
  cards: FlashCard[];
  isBuiltIn: boolean;
  createdAt: Date;
  studiedAt?: Date;
  progress: {
    studied: number;
    mastered: number;
  };
  srsEnabled?: boolean; // Whether SRS is enabled for this deck
}

export interface StudySession {
  deckId: string;
  currentCardIndex: number;
  isFlipped: boolean;
  correctCount: number;
  incorrectCount: number;
  startTime: Date;
  srsMode?: boolean; // Whether this session uses SRS
  reviewedCards?: SRSReviewResult[]; // Cards reviewed in this session
}

export interface SRSReviewResult {
  cardId: string;
  quality: number; // 0-5 rating
  timeSpent: number; // Seconds spent on this card
  wasCorrect: boolean;
  previousInterval: number;
  newInterval: number;
  reviewDate: Date;
}

export interface SRSStats {
  totalCards: number;
  newCards: number;
  reviewCards: number;
  masteredCards: number;
  averageEaseFactor: number;
  retentionRate: number; // Percentage of cards answered correctly
  dailyReviews: number;
  streakDays: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  targetLanguage: Language | null;
  interests: string[];
  goal: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  dailyGoal: number; // minutes per day
  createdAt: Date;
  srsSettings?: SRSSettings;
}

export interface SRSSettings {
  maxNewCardsPerDay: number; // Default: 20
  maxReviewsPerDay: number; // Default: 100
  easyBonus: number; // Multiplier for easy cards (default: 1.3)
  hardPenalty: number; // Multiplier for hard cards (default: 0.8)
  graduatingInterval: number; // Days for new cards to graduate (default: 1)
  easyInterval: number; // Days for easy new cards (default: 4)
  maximumInterval: number; // Maximum days between reviews (default: 36500)
  minimumInterval: number; // Minimum days between reviews (default: 1)
}

export interface OnboardingData {
  targetLanguage: Language | null;
  interests: string[];
  goal: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  dailyGoal: number;
}

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  partOfSpeech: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  examples: string[];
  languageCode: string;
  isKnown: boolean;
  createdAt: Date;
}

export interface SentenceItem {
  id: string;
  sentence: string;
  translation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  languageCode: string;
  isKnown: boolean;
  createdAt: Date;
}

export interface StoryLine {
  id: string;
  text: string;
  translation: string;
  audioUrl?: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
}

export interface Story {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  languageCode: string;
  duration: number; // in minutes
  lines: StoryLine[];
  audioUrl: string; // full story audio
  isCompleted: boolean;
  createdAt: Date;
}