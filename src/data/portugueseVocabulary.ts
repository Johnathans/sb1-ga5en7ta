import { VocabularyItem, SentenceItem } from '../types';

export const portugueseVocabulary: VocabularyItem[] = [
  // Greetings & Basic Phrases
  {
    id: 'pt-1',
    word: 'Olá',
    translation: 'Hello',
    pronunciation: 'oh-LAH',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Olá, como está?', 'Olá, bom dia!'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-2',
    word: 'Obrigado',
    translation: 'Thank you (masculine)',
    pronunciation: 'oh-bree-GAH-doo',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Obrigado pela ajuda', 'Muito obrigado!'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-3',
    word: 'Obrigada',
    translation: 'Thank you (feminine)',
    pronunciation: 'oh-bree-GAH-dah',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Obrigada pelo presente', 'Muito obrigada!'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-4',
    word: 'Por favor',
    translation: 'Please',
    pronunciation: 'por fah-VOR',
    partOfSpeech: 'adverb',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Por favor, me ajude', 'Água, por favor'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-5',
    word: 'Desculpe',
    translation: 'Excuse me / Sorry',
    pronunciation: 'des-KOOL-peh',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Desculpe, onde fica o banheiro?', 'Desculpe pelo atraso'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-6',
    word: 'Bom dia',
    translation: 'Good morning',
    pronunciation: 'bom DEE-ah',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Bom dia! Como passou a noite?', 'Bom dia, professor'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-7',
    word: 'Boa tarde',
    translation: 'Good afternoon',
    pronunciation: 'BOH-ah TAR-deh',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Boa tarde! Tudo bem?', 'Boa tarde, senhora'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-8',
    word: 'Boa noite',
    translation: 'Good evening / Good night',
    pronunciation: 'BOH-ah NOH-ee-teh',
    partOfSpeech: 'interjection',
    difficulty: 'beginner',
    category: 'Greetings',
    examples: ['Boa noite! Durma bem', 'Boa noite, até amanhã'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Family & Relationships
  {
    id: 'pt-9',
    word: 'Família',
    translation: 'Family',
    pronunciation: 'fah-MEE-lee-ah',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Minha família é grande', 'Amo minha família'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-10',
    word: 'Pai',
    translation: 'Father',
    pronunciation: 'PIE',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Meu pai trabalha muito', 'O pai dela é médico'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-11',
    word: 'Mãe',
    translation: 'Mother',
    pronunciation: 'mah-EH',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Minha mãe cozinha bem', 'A mãe dele é professora'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-12',
    word: 'Irmão',
    translation: 'Brother',
    pronunciation: 'eer-MAH-oo',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Tenho um irmão mais novo', 'Meu irmão estuda medicina'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-13',
    word: 'Irmã',
    translation: 'Sister',
    pronunciation: 'eer-MAH',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Home & Family',
    examples: ['Minha irmã mora em São Paulo', 'Ela tem duas irmãs'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Food & Dining
  {
    id: 'pt-14',
    word: 'Comida',
    translation: 'Food',
    pronunciation: 'ko-MEE-dah',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Food & Dining',
    examples: ['A comida está deliciosa', 'Gosto de comida brasileira'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-15',
    word: 'Água',
    translation: 'Water',
    pronunciation: 'AH-gwah',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Food & Dining',
    examples: ['Preciso beber água', 'A água está gelada'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-16',
    word: 'Pão',
    translation: 'Bread',
    pronunciation: 'pah-OO',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Food & Dining',
    examples: ['Comprei pão fresco', 'O pão está quentinho'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-17',
    word: 'Café',
    translation: 'Coffee',
    pronunciation: 'kah-FEH',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Food & Dining',
    examples: ['Tomo café toda manhã', 'O café brasileiro é famoso'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-18',
    word: 'Leite',
    translation: 'Milk',
    pronunciation: 'LAY-teh',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Food & Dining',
    examples: ['Café com leite', 'O leite está na geladeira'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Travel & Transportation
  {
    id: 'pt-19',
    word: 'Viagem',
    translation: 'Trip / Travel',
    pronunciation: 'vee-AH-zhem',
    partOfSpeech: 'noun',
    difficulty: 'intermediate',
    category: 'Travel & Transportation',
    examples: ['Fiz uma viagem incrível', 'A viagem foi longa'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-20',
    word: 'Hotel',
    translation: 'Hotel',
    pronunciation: 'oh-TEHL',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Travel & Transportation',
    examples: ['O hotel é muito confortável', 'Reservei um quarto no hotel'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-21',
    word: 'Aeroporto',
    translation: 'Airport',
    pronunciation: 'ah-eh-ro-POR-too',
    partOfSpeech: 'noun',
    difficulty: 'intermediate',
    category: 'Travel & Transportation',
    examples: ['Vou ao aeroporto buscar minha mãe', 'O aeroporto está movimentado'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-22',
    word: 'Ônibus',
    translation: 'Bus',
    pronunciation: 'OH-nee-boos',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Travel & Transportation',
    examples: ['Pego o ônibus para o trabalho', 'O ônibus está atrasado'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-23',
    word: 'Táxi',
    translation: 'Taxi',
    pronunciation: 'TAHK-see',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Travel & Transportation',
    examples: ['Chamei um táxi', 'O táxi chegou rapidamente'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Work & Career
  {
    id: 'pt-24',
    word: 'Trabalho',
    translation: 'Work / Job',
    pronunciation: 'trah-BAH-lyoo',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Work & Career',
    examples: ['Gosto do meu trabalho', 'O trabalho está difícil'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-25',
    word: 'Escritório',
    translation: 'Office',
    pronunciation: 'es-kree-TOH-ree-oo',
    partOfSpeech: 'noun',
    difficulty: 'intermediate',
    category: 'Work & Career',
    examples: ['Trabalho no escritório', 'O escritório é moderno'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-26',
    word: 'Reunião',
    translation: 'Meeting',
    pronunciation: 'heh-oo-nee-AH-oo',
    partOfSpeech: 'noun',
    difficulty: 'intermediate',
    category: 'Work & Career',
    examples: ['Tenho uma reunião às 3h', 'A reunião foi produtiva'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-27',
    word: 'Chefe',
    translation: 'Boss',
    pronunciation: 'SHEH-feh',
    partOfSpeech: 'noun',
    difficulty: 'beginner',
    category: 'Work & Career',
    examples: ['Meu chefe é muito legal', 'O chefe chegou cedo hoje'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Common Verbs
  {
    id: 'pt-28',
    word: 'Ser',
    translation: 'To be (permanent)',
    pronunciation: 'sehr',
    partOfSpeech: 'verb',
    difficulty: 'intermediate',
    category: 'Common Verbs',
    examples: ['Eu sou brasileiro', 'Ela é médica'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-29',
    word: 'Estar',
    translation: 'To be (temporary)',
    pronunciation: 'es-TAHR',
    partOfSpeech: 'verb',
    difficulty: 'intermediate',
    category: 'Common Verbs',
    examples: ['Estou bem', 'Ela está em casa'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-30',
    word: 'Ter',
    translation: 'To have',
    pronunciation: 'tehr',
    partOfSpeech: 'verb',
    difficulty: 'intermediate',
    category: 'Common Verbs',
    examples: ['Tenho dois filhos', 'Ela tem um carro novo'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-31',
    word: 'Fazer',
    translation: 'To do / To make',
    pronunciation: 'fah-ZEHR',
    partOfSpeech: 'verb',
    difficulty: 'intermediate',
    category: 'Common Verbs',
    examples: ['Vou fazer o jantar', 'O que você faz?'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-32',
    word: 'Ir',
    translation: 'To go',
    pronunciation: 'eer',
    partOfSpeech: 'verb',
    difficulty: 'intermediate',
    category: 'Common Verbs',
    examples: ['Vou ao mercado', 'Ela vai viajar amanhã'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Numbers
  {
    id: 'pt-33',
    word: 'Um',
    translation: 'One (masculine)',
    pronunciation: 'oom',
    partOfSpeech: 'number',
    difficulty: 'beginner',
    category: 'Numbers',
    examples: ['Um livro', 'Tenho um irmão'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-34',
    word: 'Uma',
    translation: 'One (feminine)',
    pronunciation: 'OO-mah',
    partOfSpeech: 'number',
    difficulty: 'beginner',
    category: 'Numbers',
    examples: ['Uma casa', 'Tenho uma irmã'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-35',
    word: 'Dois',
    translation: 'Two (masculine)',
    pronunciation: 'doh-ees',
    partOfSpeech: 'number',
    difficulty: 'beginner',
    category: 'Numbers',
    examples: ['Dois carros', 'Tenho dois gatos'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-36',
    word: 'Duas',
    translation: 'Two (feminine)',
    pronunciation: 'DOO-ahs',
    partOfSpeech: 'number',
    difficulty: 'beginner',
    category: 'Numbers',
    examples: ['Duas casas', 'Tenho duas filhas'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Colors
  {
    id: 'pt-37',
    word: 'Azul',
    translation: 'Blue',
    pronunciation: 'ah-ZOOL',
    partOfSpeech: 'adjective',
    difficulty: 'beginner',
    category: 'Colors & Descriptions',
    examples: ['O céu está azul', 'Gosto da cor azul'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-38',
    word: 'Verde',
    translation: 'Green',
    pronunciation: 'VEHR-deh',
    partOfSpeech: 'adjective',
    difficulty: 'beginner',
    category: 'Colors & Descriptions',
    examples: ['As folhas são verdes', 'Meu carro é verde'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-39',
    word: 'Vermelho',
    translation: 'Red',
    pronunciation: 'ver-MEH-lyoo',
    partOfSpeech: 'adjective',
    difficulty: 'beginner',
    category: 'Colors & Descriptions',
    examples: ['A rosa é vermelha', 'Uso uma camisa vermelha'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-40',
    word: 'Amarelo',
    translation: 'Yellow',
    pronunciation: 'ah-mah-REH-loo',
    partOfSpeech: 'adjective',
    difficulty: 'beginner',
    category: 'Colors & Descriptions',
    examples: ['O sol é amarelo', 'Comprei uma blusa amarela'],
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  }
];

export const portugueseSentences: SentenceItem[] = [
  // Basic Greetings & Introductions
  {
    id: 'pt-sent-1',
    sentence: 'Como você está?',
    translation: 'How are you?',
    difficulty: 'beginner',
    category: 'Greetings',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-2',
    sentence: 'Muito prazer em conhecê-lo.',
    translation: 'Nice to meet you.',
    difficulty: 'intermediate',
    category: 'Greetings',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-3',
    sentence: 'Qual é o seu nome?',
    translation: 'What is your name?',
    difficulty: 'beginner',
    category: 'Greetings',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-4',
    sentence: 'Meu nome é Maria.',
    translation: 'My name is Maria.',
    difficulty: 'beginner',
    category: 'Greetings',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Food & Dining
  {
    id: 'pt-sent-5',
    sentence: 'Eu gostaria de um café, por favor.',
    translation: 'I would like a coffee, please.',
    difficulty: 'intermediate',
    category: 'Food & Dining',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-6',
    sentence: 'A comida brasileira é deliciosa.',
    translation: 'Brazilian food is delicious.',
    difficulty: 'intermediate',
    category: 'Food & Dining',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-7',
    sentence: 'Onde posso encontrar um bom restaurante?',
    translation: 'Where can I find a good restaurant?',
    difficulty: 'intermediate',
    category: 'Food & Dining',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-8',
    sentence: 'A conta, por favor.',
    translation: 'The check, please.',
    difficulty: 'beginner',
    category: 'Food & Dining',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Travel & Directions
  {
    id: 'pt-sent-9',
    sentence: 'Onde fica a estação de trem?',
    translation: 'Where is the train station?',
    difficulty: 'intermediate',
    category: 'Travel & Transportation',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-10',
    sentence: 'Quanto custa uma passagem para São Paulo?',
    translation: 'How much does a ticket to São Paulo cost?',
    difficulty: 'intermediate',
    category: 'Travel & Transportation',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-11',
    sentence: 'Estou perdido. Pode me ajudar?',
    translation: 'I am lost. Can you help me?',
    difficulty: 'intermediate',
    category: 'Travel & Transportation',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-12',
    sentence: 'O hotel fica longe daqui?',
    translation: 'Is the hotel far from here?',
    difficulty: 'intermediate',
    category: 'Travel & Transportation',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Shopping
  {
    id: 'pt-sent-13',
    sentence: 'Quanto custa isso?',
    translation: 'How much does this cost?',
    difficulty: 'beginner',
    category: 'Shopping',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-14',
    sentence: 'Posso experimentar esta roupa?',
    translation: 'Can I try on this clothing?',
    difficulty: 'intermediate',
    category: 'Shopping',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-15',
    sentence: 'Você aceita cartão de crédito?',
    translation: 'Do you accept credit cards?',
    difficulty: 'intermediate',
    category: 'Shopping',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-16',
    sentence: 'Onde fica o shopping center?',
    translation: 'Where is the shopping center?',
    difficulty: 'beginner',
    category: 'Shopping',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Daily Life
  {
    id: 'pt-sent-17',
    sentence: 'Que horas são?',
    translation: 'What time is it?',
    difficulty: 'beginner',
    category: 'Daily Life',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-18',
    sentence: 'Preciso ir ao banco.',
    translation: 'I need to go to the bank.',
    difficulty: 'intermediate',
    category: 'Daily Life',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-19',
    sentence: 'O tempo está muito quente hoje.',
    translation: 'The weather is very hot today.',
    difficulty: 'intermediate',
    category: 'Daily Life',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-20',
    sentence: 'Vou estudar português todos os dias.',
    translation: 'I will study Portuguese every day.',
    difficulty: 'intermediate',
    category: 'Daily Life',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Work & Business
  {
    id: 'pt-sent-21',
    sentence: 'Trabalho em uma empresa de tecnologia.',
    translation: 'I work at a technology company.',
    difficulty: 'intermediate',
    category: 'Work & Career',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-22',
    sentence: 'A reunião é às duas horas.',
    translation: 'The meeting is at two o\'clock.',
    difficulty: 'intermediate',
    category: 'Work & Career',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-23',
    sentence: 'Preciso terminar este projeto hoje.',
    translation: 'I need to finish this project today.',
    difficulty: 'advanced',
    category: 'Work & Career',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-24',
    sentence: 'Meu chefe é muito compreensivo.',
    translation: 'My boss is very understanding.',
    difficulty: 'intermediate',
    category: 'Work & Career',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },

  // Emergency & Health
  {
    id: 'pt-sent-25',
    sentence: 'Preciso de ajuda!',
    translation: 'I need help!',
    difficulty: 'beginner',
    category: 'Emergency',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-26',
    sentence: 'Onde fica o hospital mais próximo?',
    translation: 'Where is the nearest hospital?',
    difficulty: 'intermediate',
    category: 'Emergency',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-27',
    sentence: 'Não me sinto bem.',
    translation: 'I don\'t feel well.',
    difficulty: 'intermediate',
    category: 'Health',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'pt-sent-28',
    sentence: 'Preciso de um médico.',
    translation: 'I need a doctor.',
    difficulty: 'beginner',
    category: 'Health',
    languageCode: 'pt',
    isKnown: false,
    createdAt: new Date('2024-01-01')
  }
];