import { Story } from '../types';

export const storiesData: Story[] = [
  // Spanish Stories
  {
    id: 'es-story-1',
    title: 'Un Día en el Mercado',
    description: 'Follow Maria as she shops at the local market and learns about fresh ingredients.',
    imageUrl: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'beginner',
    category: 'Daily Life',
    languageCode: 'es',
    duration: 3,
    audioUrl: '/audio/es-market-story.mp3',
    isCompleted: false,
    createdAt: new Date('2024-01-01'),
    lines: [
      {
        id: 'es-1-1',
        text: 'María camina hacia el mercado.',
        translation: 'Maria walks towards the market.',
        startTime: 0,
        endTime: 3
      },
      {
        id: 'es-1-2',
        text: 'El sol brilla en el cielo azul.',
        translation: 'The sun shines in the blue sky.',
        startTime: 3,
        endTime: 6
      },
      {
        id: 'es-1-3',
        text: 'Hay muchas frutas frescas.',
        translation: 'There are many fresh fruits.',
        startTime: 6,
        endTime: 9
      },
      {
        id: 'es-1-4',
        text: 'María compra manzanas rojas.',
        translation: 'Maria buys red apples.',
        startTime: 9,
        endTime: 12
      },
      {
        id: 'es-1-5',
        text: 'El vendedor sonríe amablemente.',
        translation: 'The vendor smiles kindly.',
        startTime: 12,
        endTime: 15
      }
    ]
  },
  {
    id: 'es-story-2',
    title: 'La Aventura en la Ciudad',
    description: 'Join Carlos on his exciting adventure exploring the bustling city center.',
    imageUrl: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'intermediate',
    category: 'Adventure',
    languageCode: 'es',
    duration: 5,
    audioUrl: '/audio/es-city-adventure.mp3',
    isCompleted: false,
    createdAt: new Date('2024-01-01'),
    lines: [
      {
        id: 'es-2-1',
        text: 'Carlos llega a la estación de tren.',
        translation: 'Carlos arrives at the train station.',
        startTime: 0,
        endTime: 4
      },
      {
        id: 'es-2-2',
        text: 'La ciudad está llena de vida.',
        translation: 'The city is full of life.',
        startTime: 4,
        endTime: 8
      },
      {
        id: 'es-2-3',
        text: 'Decide explorar el centro histórico.',
        translation: 'He decides to explore the historic center.',
        startTime: 8,
        endTime: 12
      },
      {
        id: 'es-2-4',
        text: 'Los edificios antiguos son impresionantes.',
        translation: 'The old buildings are impressive.',
        startTime: 12,
        endTime: 16
      }
    ]
  },

  // French Stories
  {
    id: 'fr-story-1',
    title: 'Le Petit Café',
    description: 'Experience French café culture through the eyes of a young barista.',
    imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'beginner',
    category: 'Culture',
    languageCode: 'fr',
    duration: 4,
    audioUrl: '/audio/fr-cafe-story.mp3',
    isCompleted: false,
    createdAt: new Date('2024-01-01'),
    lines: [
      {
        id: 'fr-1-1',
        text: 'Sophie ouvre le petit café.',
        translation: 'Sophie opens the small café.',
        startTime: 0,
        endTime: 3
      },
      {
        id: 'fr-1-2',
        text: 'L\'arôme du café remplit l\'air.',
        translation: 'The aroma of coffee fills the air.',
        startTime: 3,
        endTime: 6
      },
      {
        id: 'fr-1-3',
        text: 'Les clients arrivent lentement.',
        translation: 'The customers arrive slowly.',
        startTime: 6,
        endTime: 9
      },
      {
        id: 'fr-1-4',
        text: 'Elle prépare un café au lait.',
        translation: 'She prepares a café au lait.',
        startTime: 9,
        endTime: 12
      }
    ]
  },

  // German Stories
  {
    id: 'de-story-1',
    title: 'Der Spaziergang im Park',
    description: 'Take a peaceful walk through a German park and enjoy nature.',
    imageUrl: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'beginner',
    category: 'Nature',
    languageCode: 'de',
    duration: 3,
    audioUrl: '/audio/de-park-walk.mp3',
    isCompleted: false,
    createdAt: new Date('2024-01-01'),
    lines: [
      {
        id: 'de-1-1',
        text: 'Anna geht durch den Park.',
        translation: 'Anna walks through the park.',
        startTime: 0,
        endTime: 3
      },
      {
        id: 'de-1-2',
        text: 'Die Bäume sind sehr grün.',
        translation: 'The trees are very green.',
        startTime: 3,
        endTime: 6
      },
      {
        id: 'de-1-3',
        text: 'Vögel singen in den Ästen.',
        translation: 'Birds sing in the branches.',
        startTime: 6,
        endTime: 9
      },
      {
        id: 'de-1-4',
        text: 'Es ist ein schöner Tag.',
        translation: 'It is a beautiful day.',
        startTime: 9,
        endTime: 12
      }
    ]
  },

  // Japanese Stories
  {
    id: 'ja-story-1',
    title: '桜の季節',
    description: 'Experience the beauty of cherry blossom season in Japan.',
    imageUrl: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'intermediate',
    category: 'Culture',
    languageCode: 'ja',
    duration: 4,
    audioUrl: '/audio/ja-sakura-story.mp3',
    isCompleted: false,
    createdAt: new Date('2024-01-01'),
    lines: [
      {
        id: 'ja-1-1',
        text: '春が来ました。',
        translation: 'Spring has come.',
        startTime: 0,
        endTime: 3
      },
      {
        id: 'ja-1-2',
        text: '桜の花が咲いています。',
        translation: 'The cherry blossoms are blooming.',
        startTime: 3,
        endTime: 6
      },
      {
        id: 'ja-1-3',
        text: '公園はとても美しいです。',
        translation: 'The park is very beautiful.',
        startTime: 6,
        endTime: 9
      },
      {
        id: 'ja-1-4',
        text: '家族と一緒に花見をします。',
        translation: 'I will view flowers with my family.',
        startTime: 9,
        endTime: 12
      }
    ]
  },

  // Portuguese Stories
  {
    id: 'pt-story-1',
    title: 'Uma Manhã no Rio',
    description: 'Experience a beautiful morning in Rio de Janeiro with local culture and scenery.',
    imageUrl: 'https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'beginner',
    category: 'Culture',
    languageCode: 'pt',
    duration: 4,
    audioUrl: '/audio/pt-rio-morning.mp3',
    isCompleted: false,
    createdAt: new Date('2024-01-01'),
    lines: [
      {
        id: 'pt-1-1',
        text: 'O sol nasce sobre a praia de Copacabana.',
        translation: 'The sun rises over Copacabana beach.',
        startTime: 0,
        endTime: 4
      },
      {
        id: 'pt-1-2',
        text: 'As pessoas fazem exercícios na areia.',
        translation: 'People exercise on the sand.',
        startTime: 4,
        endTime: 8
      },
      {
        id: 'pt-1-3',
        text: 'O vendedor de açaí passa cantando.',
        translation: 'The açaí vendor passes by singing.',
        startTime: 8,
        endTime: 12
      },
      {
        id: 'pt-1-4',
        text: 'É um dia perfeito no Rio de Janeiro.',
        translation: 'It\'s a perfect day in Rio de Janeiro.',
        startTime: 12,
        endTime: 16
      }
    ]
  },
  {
    id: 'pt-story-2',
    title: 'O Mercado da Cidade',
    description: 'Explore a bustling Brazilian market and discover local flavors and traditions.',
    imageUrl: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
    difficulty: 'intermediate',
    category: 'Daily Life',
    languageCode: 'pt',
    duration: 5,
    audioUrl: '/audio/pt-market-story.mp3',
    isCompleted: false,
    createdAt: new Date('2024-01-01'),
    lines: [
      {
        id: 'pt-2-1',
        text: 'Ana entra no mercado municipal.',
        translation: 'Ana enters the municipal market.',
        startTime: 0,
        endTime: 3
      },
      {
        id: 'pt-2-2',
        text: 'Há frutas tropicais por toda parte.',
        translation: 'There are tropical fruits everywhere.',
        startTime: 3,
        endTime: 6
      },
      {
        id: 'pt-2-3',
        text: 'Ela compra manga e abacaxi frescos.',
        translation: 'She buys fresh mango and pineapple.',
        startTime: 6,
        endTime: 9
      },
      {
        id: 'pt-2-4',
        text: 'O vendedor oferece uma amostra grátis.',
        translation: 'The vendor offers a free sample.',
        startTime: 9,
        endTime: 12
      },
      {
        id: 'pt-2-5',
        text: 'Ana sorri e agradece pela gentileza.',
        translation: 'Ana smiles and thanks him for the kindness.',
        startTime: 12,
        endTime: 15
      }
    ]
  }
];