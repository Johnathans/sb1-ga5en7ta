import { Deck } from '../types';

export const sampleDecks: Deck[] = [
  {
    id: 'es-basics',
    name: 'Spanish Basics',
    description: 'Essential Spanish words and phrases for beginners',
    languageCode: 'es',
    isBuiltIn: true,
    createdAt: new Date('2024-01-01'),
    progress: { studied: 0, mastered: 0 },
    cards: [
      { id: '1', front: 'Hello', back: 'Hola' },
      { id: '2', front: 'Goodbye', back: 'Adiós' },
      { id: '3', front: 'Thank you', back: 'Gracias' },
      { id: '4', front: 'Please', back: 'Por favor' },
      { id: '5', front: 'Yes', back: 'Sí' },
      { id: '6', front: 'No', back: 'No' },
      { id: '7', front: 'Water', back: 'Agua' },
      { id: '8', front: 'Food', back: 'Comida' },
      { id: '9', front: 'House', back: 'Casa' },
      { id: '10', front: 'Family', back: 'Familia' }
    ]
  },
  {
    id: 'fr-essentials',
    name: 'French Essentials',
    description: 'Must-know French vocabulary for everyday conversations',
    languageCode: 'fr',
    isBuiltIn: true,
    createdAt: new Date('2024-01-01'),
    progress: { studied: 0, mastered: 0 },
    cards: [
      { id: '1', front: 'Hello', back: 'Bonjour' },
      { id: '2', front: 'Goodbye', back: 'Au revoir' },
      { id: '3', front: 'Thank you', back: 'Merci' },
      { id: '4', front: 'Please', back: 'S\'il vous plaît' },
      { id: '5', front: 'Excuse me', back: 'Excusez-moi' },
      { id: '6', front: 'Sorry', back: 'Désolé' },
      { id: '7', front: 'Good morning', back: 'Bonjour' },
      { id: '8', front: 'Good evening', back: 'Bonsoir' },
      { id: '9', front: 'How are you?', back: 'Comment allez-vous?' },
      { id: '10', front: 'My name is', back: 'Je m\'appelle' }
    ]
  },
  {
    id: 'de-beginners',
    name: 'German for Beginners',
    description: 'Start your German journey with these fundamental words',
    languageCode: 'de',
    isBuiltIn: true,
    createdAt: new Date('2024-01-01'),
    progress: { studied: 0, mastered: 0 },
    cards: [
      { id: '1', front: 'Hello', back: 'Hallo' },
      { id: '2', front: 'Goodbye', back: 'Auf Wiedersehen' },
      { id: '3', front: 'Thank you', back: 'Danke' },
      { id: '4', front: 'Please', back: 'Bitte' },
      { id: '5', front: 'Yes', back: 'Ja' },
      { id: '6', front: 'No', back: 'Nein' },
      { id: '7', front: 'Good morning', back: 'Guten Morgen' },
      { id: '8', front: 'Good evening', back: 'Guten Abend' },
      { id: '9', front: 'How are you?', back: 'Wie geht es Ihnen?' },
      { id: '10', front: 'I don\'t understand', back: 'Ich verstehe nicht' }
    ]
  },
  {
    id: 'ja-basics',
    name: 'Japanese Fundamentals',
    description: 'Essential Japanese phrases and greetings',
    languageCode: 'ja',
    isBuiltIn: true,
    createdAt: new Date('2024-01-01'),
    progress: { studied: 0, mastered: 0 },
    cards: [
      { id: '1', front: 'Hello', back: 'こんにちは (Konnichiwa)' },
      { id: '2', front: 'Good morning', back: 'おはよう (Ohayou)' },
      { id: '3', front: 'Thank you', back: 'ありがとう (Arigatou)' },
      { id: '4', front: 'Excuse me', back: 'すみません (Sumimasen)' },
      { id: '5', front: 'Yes', back: 'はい (Hai)' },
      { id: '6', front: 'No', back: 'いいえ (Iie)' },
      { id: '7', front: 'Please', back: 'お願いします (Onegaishimasu)' },
      { id: '8', front: 'Goodbye', back: 'さようなら (Sayounara)' },
      { id: '9', front: 'Nice to meet you', back: 'はじめまして (Hajimemashite)' },
      { id: '10', front: 'I don\'t understand', back: 'わかりません (Wakarimasen)' }
    ]
  },
  {
    id: 'pt-basics',
    name: 'Portuguese Essentials',
    description: 'Essential Portuguese words and phrases for beginners',
    languageCode: 'pt',
    isBuiltIn: true,
    createdAt: new Date('2024-01-01'),
    progress: { studied: 0, mastered: 0 },
    cards: [
      { id: '1', front: 'Hello', back: 'Olá' },
      { id: '2', front: 'Goodbye', back: 'Tchau' },
      { id: '3', front: 'Thank you (m)', back: 'Obrigado' },
      { id: '4', front: 'Thank you (f)', back: 'Obrigada' },
      { id: '5', front: 'Please', back: 'Por favor' },
      { id: '6', front: 'Excuse me', back: 'Desculpe' },
      { id: '7', front: 'Good morning', back: 'Bom dia' },
      { id: '8', front: 'Good afternoon', back: 'Boa tarde' },
      { id: '9', front: 'Good night', back: 'Boa noite' },
      { id: '10', front: 'How are you?', back: 'Como você está?' },
      { id: '11', front: 'Water', back: 'Água' },
      { id: '12', front: 'Food', back: 'Comida' },
      { id: '13', front: 'House', back: 'Casa' },
      { id: '14', front: 'Family', back: 'Família' },
      { id: '15', front: 'Work', back: 'Trabalho' }
    ]
  }
];