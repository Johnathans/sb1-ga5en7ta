interface VocabularyApiResponse {
  word: string;
  translation: string;
  pronunciation?: string;
  partOfSpeech: string;
  examples: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface TranslationApiResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

class VocabularyService {
  private readonly GOOGLE_TRANSLATE_API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  private readonly GOOGLE_TRANSLATE_BASE = 'https://translation.googleapis.com/language/translate/v2';

  // Core word lists for systematic vocabulary building
  private readonly CORE_ENGLISH_WORDS = {
    'Greetings': [
      'hello', 'goodbye', 'thank you', 'please', 'excuse me', 'sorry', 
      'good morning', 'good afternoon', 'good evening', 'good night',
      'how are you', 'nice to meet you', 'see you later', 'welcome'
    ],
    'Home & Family': [
      'family', 'father', 'mother', 'son', 'daughter', 'brother', 'sister',
      'grandfather', 'grandmother', 'uncle', 'aunt', 'cousin', 'husband', 'wife',
      'house', 'home', 'room', 'kitchen', 'bathroom', 'bedroom', 'living room'
    ],
    'Food & Dining': [
      'food', 'water', 'bread', 'meat', 'fish', 'chicken', 'beef', 'pork',
      'vegetables', 'fruit', 'apple', 'banana', 'orange', 'rice', 'pasta',
      'milk', 'coffee', 'tea', 'beer', 'wine', 'restaurant', 'menu', 'bill'
    ],
    'Travel & Transportation': [
      'travel', 'trip', 'vacation', 'hotel', 'airport', 'train', 'bus', 'taxi',
      'car', 'bicycle', 'ticket', 'passport', 'luggage', 'map', 'direction',
      'left', 'right', 'straight', 'stop', 'go', 'near', 'far'
    ],
    'Work & Career': [
      'work', 'job', 'office', 'boss', 'employee', 'meeting', 'project',
      'computer', 'phone', 'email', 'document', 'report', 'schedule',
      'salary', 'career', 'business', 'company', 'colleague'
    ],
    'Health & Body': [
      'health', 'doctor', 'hospital', 'medicine', 'sick', 'pain', 'headache',
      'fever', 'cold', 'cough', 'body', 'head', 'eye', 'nose', 'mouth',
      'hand', 'foot', 'arm', 'leg', 'heart', 'stomach'
    ],
    'Education': [
      'school', 'university', 'student', 'teacher', 'book', 'pen', 'paper',
      'class', 'lesson', 'homework', 'exam', 'grade', 'learn', 'study',
      'read', 'write', 'speak', 'listen', 'understand'
    ],
    'Shopping': [
      'shop', 'store', 'market', 'buy', 'sell', 'price', 'money', 'cash',
      'credit card', 'receipt', 'bag', 'clothes', 'shirt', 'pants', 'shoes',
      'size', 'color', 'expensive', 'cheap', 'discount'
    ],
    'Time & Weather': [
      'time', 'hour', 'minute', 'day', 'week', 'month', 'year', 'today',
      'tomorrow', 'yesterday', 'morning', 'afternoon', 'evening', 'night',
      'weather', 'sun', 'rain', 'snow', 'wind', 'hot', 'cold', 'warm'
    ],
    'Colors & Descriptions': [
      'red', 'blue', 'green', 'yellow', 'black', 'white', 'brown', 'pink',
      'orange', 'purple', 'big', 'small', 'tall', 'short', 'long', 'wide',
      'beautiful', 'ugly', 'good', 'bad', 'new', 'old', 'fast', 'slow'
    ],
    'Numbers': [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
      'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand'
    ],
    'Common Verbs': [
      'be', 'have', 'do', 'make', 'go', 'come', 'see', 'know', 'think', 'take',
      'get', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try',
      'leave', 'call', 'want', 'need', 'like', 'love', 'hate', 'help', 'start', 'stop'
    ]
  };

  // Translate a single word using Google Translate API
  async translateWord(word: string, targetLanguage: string = 'pt'): Promise<string> {
    if (!this.GOOGLE_TRANSLATE_API_KEY) {
      console.warn('Google Translate API key not found');
      return word;
    }

    try {
      const response = await fetch(`${this.GOOGLE_TRANSLATE_BASE}?key=${this.GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: word,
          source: 'en',
          target: targetLanguage,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return word; // Fallback to original word
    }
  }

  // Translate multiple words in batch
  async translateWordsBatch(words: string[], targetLanguage: string = 'pt'): Promise<Record<string, string>> {
    if (!this.GOOGLE_TRANSLATE_API_KEY) {
      console.warn('Google Translate API key not found');
      return {};
    }

    try {
      const response = await fetch(`${this.GOOGLE_TRANSLATE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: words,
          source: 'en',
          target: targetLanguage,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translations: Record<string, string> = {};
      
      data.data.translations.forEach((translation: any, index: number) => {
        translations[words[index]] = translation.translatedText;
      });

      return translations;
    } catch (error) {
      console.error('Batch translation error:', error);
      return {};
    }
  }

  // Generate comprehensive vocabulary for a category
  async generateVocabularyForCategory(category: string, targetLanguage: string = 'pt'): Promise<VocabularyApiResponse[]> {
    const words = this.CORE_ENGLISH_WORDS[category as keyof typeof this.CORE_ENGLISH_WORDS] || [];
    const vocabulary: VocabularyApiResponse[] = [];

    for (const word of words) {
      try {
        const translation = await this.translateWord(word, targetLanguage);
        const pronunciation = await this.generatePronunciation(translation, targetLanguage);
        
        vocabulary.push({
          word: translation,
          translation: word,
          pronunciation,
          partOfSpeech: this.guessPartOfSpeech(word),
          examples: await this.generateExamples(translation, targetLanguage),
          difficulty: this.calculateDifficulty(word)
        });

        // Add delay to respect API rate limits
        await this.delay(200);
      } catch (error) {
        console.error(`Error processing word "${word}":`, error);
      }
    }

    return vocabulary;
  }

  // Generate example sentences using the translated word
  async generateExamples(word: string, targetLanguage: string = 'pt'): Promise<string[]> {
    const englishExamples = [
      `I like ${word}`,
      `This is a ${word}`,
      `Where is the ${word}?`,
      `Can you help me with ${word}?`
    ];

    const examples: string[] = [];
    for (const example of englishExamples.slice(0, 2)) {
      try {
        const translatedExample = await this.translateWord(example, targetLanguage);
        examples.push(translatedExample);
        await this.delay(100);
      } catch (error) {
        console.error('Error translating example:', error);
      }
    }

    return examples;
  }

  // Generate pronunciation guide (simplified)
  async generatePronunciation(word: string, languageCode: string): Promise<string> {
    // For Portuguese, we can create a basic pronunciation guide
    if (languageCode === 'pt') {
      return this.generatePortuguesePronunciation(word);
    }
    return '';
  }

  private generatePortuguesePronunciation(word: string): string {
    // Basic Portuguese pronunciation rules
    return word
      .toLowerCase()
      .replace(/ç/g, 's')
      .replace(/nh/g, 'ny')
      .replace(/lh/g, 'ly')
      .replace(/r$/g, 'h')
      .replace(/x/g, 'sh');
  }

  // Guess part of speech based on word patterns
  private guessPartOfSpeech(word: string): string {
    const verbs = ['be', 'have', 'do', 'make', 'go', 'come', 'see', 'know', 'think', 'take'];
    const adjectives = ['big', 'small', 'good', 'bad', 'beautiful', 'ugly', 'hot', 'cold'];
    const prepositions = ['in', 'on', 'at', 'by', 'for', 'with', 'from', 'to'];
    
    if (verbs.includes(word)) return 'verb';
    if (adjectives.includes(word)) return 'adjective';
    if (prepositions.includes(word)) return 'preposition';
    if (word.endsWith('ly')) return 'adverb';
    if (word.endsWith('ing')) return 'verb';
    if (word.endsWith('ed')) return 'verb';
    
    return 'noun'; // Default assumption
  }

  // Calculate difficulty based on word characteristics
  private calculateDifficulty(word: string): 'beginner' | 'intermediate' | 'advanced' {
    const basicWords = ['hello', 'goodbye', 'yes', 'no', 'water', 'food', 'house'];
    const intermediateWords = ['beautiful', 'important', 'different', 'available'];
    
    if (basicWords.includes(word) || word.length <= 4) {
      return 'beginner';
    } else if (intermediateWords.includes(word) || word.length <= 8) {
      return 'intermediate';
    } else {
      return 'advanced';
    }
  }

  // Import vocabulary for all categories
  async importAllVocabulary(targetLanguage: string = 'pt'): Promise<void> {
    const categories = Object.keys(this.CORE_ENGLISH_WORDS);
    const allVocabulary: Record<string, VocabularyApiResponse[]> = {};

    for (const category of categories) {
      console.log(`🔄 Importing ${category} vocabulary...`);
      
      try {
        const vocabulary = await this.generateVocabularyForCategory(category, targetLanguage);
        allVocabulary[category] = vocabulary;
        
        // Save to localStorage
        localStorage.setItem(`vocabulary_${targetLanguage}_${category}`, JSON.stringify(vocabulary));
        
        console.log(`✅ Imported ${vocabulary.length} words for ${category}`);
      } catch (error) {
        console.error(`❌ Error importing ${category}:`, error);
      }
    }

    // Save complete vocabulary set
    localStorage.setItem(`vocabulary_${targetLanguage}_complete`, JSON.stringify(allVocabulary));
    console.log(`🎉 Complete vocabulary import finished for ${targetLanguage}`);
  }

  // Get vocabulary from localStorage or generate if not exists
  async getVocabularyForCategory(category: string, targetLanguage: string = 'pt'): Promise<VocabularyApiResponse[]> {
    const stored = localStorage.getItem(`vocabulary_${targetLanguage}_${category}`);
    
    if (stored) {
      return JSON.parse(stored);
    }

    // Generate if not found
    console.log(`Generating vocabulary for ${category}...`);
    return await this.generateVocabularyForCategory(category, targetLanguage);
  }

  // Utility function for delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return !!this.GOOGLE_TRANSLATE_API_KEY;
  }

  // Get import progress
  getImportProgress(targetLanguage: string = 'pt'): { completed: number; total: number; categories: string[] } {
    const categories = Object.keys(this.CORE_ENGLISH_WORDS);
    const completed = categories.filter(category => 
      localStorage.getItem(`vocabulary_${targetLanguage}_${category}`)
    ).length;

    return {
      completed,
      total: categories.length,
      categories
    };
  }
}

export const vocabularyService = new VocabularyService();