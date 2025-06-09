import { VocabularyItem, SentenceItem } from '../types';
import { portugueseVocabulary, portugueseSentences } from './portugueseVocabulary';

// Function to load imported vocabulary from localStorage
function loadImportedVocabulary(languageCode: string): VocabularyItem[] {
  const categories = [
    'Greetings', 'Home & Family', 'Food & Dining', 'Travel & Transportation', 
    'Work & Career', 'Health & Body', 'Education', 'Shopping', 
    'Time & Weather', 'Colors & Descriptions', 'Numbers', 'Common Verbs'
  ];

  const importedVocabulary: VocabularyItem[] = [];

  categories.forEach(category => {
    const stored = localStorage.getItem(`vocabulary_${languageCode}_${category}`);
    if (stored) {
      try {
        const categoryWords = JSON.parse(stored);
        categoryWords.forEach((item: any, index: number) => {
          importedVocabulary.push({
            id: `${languageCode}-imported-${category}-${index}`,
            word: item.word,
            translation: item.translation,
            pronunciation: item.pronunciation || '',
            partOfSpeech: item.partOfSpeech,
            difficulty: item.difficulty,
            category: category,
            examples: item.examples || [],
            languageCode: languageCode,
            isKnown: false,
            createdAt: new Date()
          });
        });
      } catch (error) {
        console.error(`Error loading vocabulary for ${category}:`, error);
      }
    }
  });

  return importedVocabulary;
}

// Load imported Portuguese vocabulary
const importedPortugueseVocabulary = loadImportedVocabulary('pt');

export const vocabularyData: VocabularyItem[] = [
  // Spanish Vocabulary
  {
    id: 'es-1',
    word: 'Hola',
    translation: 'Hello',
    pronunciation: 'OH-lah',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Hola, ¿cómo estás?', 'Hola, buenos días'],
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'es-2',
    word: 'Casa',
    translation: 'House',
    pronunciation: 'KAH-sah',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Mi casa es grande', 'Voy a casa'],
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'es-3',
    word: 'Trabajar',
    translation: 'To work',
    pronunciation: 'trah-bah-HAHR',
    partOfSpeech: 'verb',
    difficulty: 'intermediate',
    category: 'Work & Career',
    examples: ['Necesito trabajar mañana', 'Trabajo en una oficina'],
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'es-4',
    word: 'Hermoso',
    translation: 'Beautiful',
    pronunciation: 'er-MOH-soh',
    partOfSpeech: 'adjective',
    difficulty: 'intermediate',
    category: 'Descriptions',
    examples: ['Qué día tan hermoso', 'Es una ciudad hermosa'],
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'es-5',
    word: 'Comprensión',
    translation: 'Understanding',
    pronunciation: 'kom-pren-see-OHN',
    partOfSpeech: 'noun',
    difficulty: 'advanced',
    category: 'Abstract Concepts',
    examples: ['La comprensión es importante', 'Necesito más comprensión'],
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // French Vocabulary
  {
    id: 'fr-1',
    word: 'Bonjour',
    translation: 'Hello/Good morning',
    pronunciation: 'bon-ZHOOR',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Bonjour madame', 'Bonjour, comment allez-vous?'],
    languageCode: 'fr',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'fr-2',
    word: 'Maison',
    translation: 'House',
    pronunciation: 'may-ZOHN',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Ma maison est petite', 'Je rentre à la maison'],
    languageCode: 'fr',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'fr-3',
    word: 'Travailler',
    translation: 'To work',
    pronunciation: 'trah-vah-YAY',
    partOfSpeech: 'verb',
    difficulty: 'intermediate',
    category: 'Work & Career',
    examples: ['Je dois travailler demain', 'Il travaille dans un bureau'],
    languageCode: 'fr',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // German Vocabulary
  {
    id: 'de-1',
    word: 'Hallo',
    translation: 'Hello',
    pronunciation: 'HAH-loh',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Hallo, wie geht es dir?', 'Hallo zusammen'],
    languageCode: 'de',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'de-2',
    word: 'Haus',
    translation: 'House',
    pronunciation: 'house',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Mein Haus ist groß', 'Ich gehe nach Hause'],
    languageCode: 'de',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Portuguese Vocabulary (manual + imported)
  ...portugueseVocabulary,
  ...importedPortugueseVocabulary
];

export const sentenceData: SentenceItem[] = [
  // Spanish Sentences
  {
    id: 'es-sent-1',
    sentence: '¿Cómo estás?',
    translation: 'How are you?',
    difficulty: 'beginner',
    category: 'Greetings',
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'es-sent-2',
    sentence: 'Me gusta mucho la comida española.',
    translation: 'I really like Spanish food.',
    difficulty: 'intermediate',
    category: 'Food & Dining',
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'es-sent-3',
    sentence: 'Necesito encontrar un trabajo que me permita viajar.',
    translation: 'I need to find a job that allows me to travel.',
    difficulty: 'advanced',
    category: 'Work & Career',
    languageCode: 'es',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // French Sentences
  {
    id: 'fr-sent-1',
    sentence: 'Comment allez-vous?',
    translation: 'How are you? (formal)',
    difficulty: 'beginner',
    category: 'Greetings',
    languageCode: 'fr',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'fr-sent-2',
    sentence: 'J\'aimerais commander le menu du jour.',
    translation: 'I would like to order the daily menu.',
    difficulty: 'intermediate',
    category: 'Food & Dining',
    languageCode: 'fr',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // German Sentences
  {
    id: 'de-sent-1',
    sentence: 'Wie geht es Ihnen?',
    translation: 'How are you? (formal)',
    difficulty: 'beginner',
    category: 'Greetings',
    languageCode: 'de',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'de-sent-2',
    sentence: 'Können Sie mir bitte helfen?',
    translation: 'Can you please help me?',
    difficulty: 'intermediate',
    category: 'Asking for Help',
    languageCode: 'de',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Portuguese Sentences
  ...portugueseSentences
];