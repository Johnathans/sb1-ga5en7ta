import React, { useState } from 'react';
import { Homepage } from './components/Homepage';
import { DeckBrowser } from './components/DeckBrowser';
import { StudyMode } from './components/StudyMode';
import { SRSStudyMode } from './components/SRSStudyMode';
import { StudyModeSelector } from './components/StudyModeSelector';
import { MatchMode } from './components/MatchMode';
import { MultiMatchMode } from './components/MultiMatchMode';
import { ClozeMode } from './components/ClozeMode';
import { DeckCreator } from './components/DeckCreator';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Dashboard } from './components/Dashboard';
import { VocabularyIndex } from './components/VocabularyIndex';
import { SentenceIndex } from './components/SentenceIndex';
import { StoriesIndex } from './components/StoriesIndex';
import { StoryReader } from './components/StoryReader';
import { ProgressPage } from './components/ProgressPage';
import { ProfilePage } from './components/ProfilePage';
import { Language, Deck, StudySession, UserProfile, OnboardingData, VocabularyItem, SentenceItem, Story } from './types';
import { sampleDecks } from './data/sampleDecks';
import { useLocalStorage } from './hooks/useLocalStorage';

type View = 'homepage' | 'decks' | 'study-selector' | 'study' | 'srs-study' | 'match' | 'multi-match' | 'cloze' | 'create' | 'edit' | 'login' | 'signup' | 'onboarding' | 'dashboard' | 'vocabulary' | 'sentences' | 'stories' | 'story-reader' | 'progress' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<View>('homepage');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [customDecks, setCustomDecks] = useLocalStorage<Deck[]>('flipped-lingo-decks', []);
  const [deckProgress, setDeckProgress] = useLocalStorage<Record<string, { studied: number; mastered: number; studiedAt?: Date }>>('flipped-lingo-progress', {});
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('flipped-lingo-user', null);

  const allDecks = [
    ...sampleDecks.map(deck => ({
      ...deck,
      progress: deckProgress[deck.id] || { studied: 0, mastered: 0 },
      studiedAt: deckProgress[deck.id]?.studiedAt ? new Date(deckProgress[deck.id].studiedAt!) : undefined
    })),
    ...customDecks.map(deck => ({
      ...deck,
      progress: deckProgress[deck.id] || { studied: 0, mastered: 0 },
      studiedAt: deckProgress[deck.id]?.studiedAt ? new Date(deckProgress[deck.id].studiedAt!) : undefined
    }))
  ];

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setCurrentView('decks');
  };

  const handleLanguageChange = (language: Language) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, targetLanguage: language };
      setUserProfile(updatedProfile);
      setSelectedLanguage(language);
    }
  };

  const handleStudyDeck = (deck: Deck) => {
    setSelectedDeck(deck);
    setCurrentView('study-selector');
  };

  const handleStudyModeSelect = (mode: 'flashcards' | 'srs' | 'match' | 'multi-match' | 'cloze') => {
    switch (mode) {
      case 'flashcards':
        setCurrentView('study');
        break;
      case 'srs':
        setCurrentView('srs-study');
        break;
      case 'match':
        setCurrentView('match');
        break;
      case 'multi-match':
        setCurrentView('multi-match');
        break;
      case 'cloze':
        setCurrentView('cloze');
        break;
    }
  };

  const handleCreateDeck = () => {
    setEditingDeck(null);
    setCurrentView('create');
  };

  const handleEditDeck = (deck: Deck) => {
    setEditingDeck(deck);
    setCurrentView('edit');
  };

  const handleSaveDeck = (deckData: Omit<Deck, 'id' | 'createdAt'>) => {
    if (editingDeck) {
      // Update existing deck
      const updatedCustomDecks = customDecks.map(deck =>
        deck.id === editingDeck.id
          ? { ...deckData, id: editingDeck.id, createdAt: editingDeck.createdAt }
          : deck
      );
      setCustomDecks(updatedCustomDecks);
    } else {
      // Create new deck
      const newDeck: Deck = {
        ...deckData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      setCustomDecks([...customDecks, newDeck]);
    }
    
    setEditingDeck(null);
    setCurrentView(isAuthenticated ? 'dashboard' : 'decks');
  };

  const handleStudyComplete = (session: StudySession) => {
    // Update deck progress
    const newProgress = {
      ...deckProgress,
      [session.deckId]: {
        studied: session.correctCount + session.incorrectCount,
        mastered: session.correctCount,
        studiedAt: new Date()
      }
    };
    setDeckProgress(newProgress);
    
    setSelectedDeck(null);
    setCurrentView(isAuthenticated ? 'dashboard' : 'decks');
  };

  const handleBack = () => {
    switch (currentView) {
      case 'decks':
        if (isAuthenticated) {
          setCurrentView('dashboard');
        } else {
          setCurrentView('homepage');
          setSelectedLanguage(null);
        }
        break;
      case 'study-selector':
        setCurrentView(isAuthenticated ? 'dashboard' : 'decks');
        setSelectedDeck(null);
        break;
      case 'study':
      case 'srs-study':
      case 'match':
      case 'multi-match':
      case 'cloze':
        setCurrentView('study-selector');
        break;
      case 'create':
      case 'edit':
        setCurrentView(isAuthenticated ? 'dashboard' : 'decks');
        setEditingDeck(null);
        break;
      case 'vocabulary':
      case 'sentences':
      case 'stories':
      case 'progress':
      case 'profile':
        setCurrentView('dashboard');
        break;
      case 'story-reader':
        setCurrentView('stories');
        setSelectedStory(null);
        break;
      case 'login':
      case 'signup':
      case 'onboarding':
        setCurrentView('homepage');
        break;
      case 'dashboard':
        setCurrentView('homepage');
        setIsAuthenticated(false);
        setUserProfile(null);
        break;
      default:
        setCurrentView('homepage');
    }
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleSignUp = () => {
    setCurrentView('signup');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToSignUp = () => {
    setCurrentView('signup');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    if (userProfile) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('onboarding');
    }
  };

  const handleSignUpSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    const newUser: UserProfile = {
      id: Date.now().toString(),
      firstName: 'John', // Default first name - this would come from signup form
      lastName: 'Doe', // Default last name - this would come from signup form
      email: 'john.doe@example.com', // Default email - this would come from signup form
      targetLanguage: data.targetLanguage,
      interests: data.interests,
      goal: data.goal,
      level: data.level,
      dailyGoal: data.dailyGoal,
      createdAt: new Date()
    };
    
    setUserProfile(newUser);
    setSelectedLanguage(data.targetLanguage);
    setCurrentView('dashboard');
  };

  const handleBrowseDecks = () => {
    if (userProfile?.targetLanguage) {
      setSelectedLanguage(userProfile.targetLanguage);
      setCurrentView('decks');
    }
  };

  const handleVocabulary = () => {
    if (userProfile?.targetLanguage) {
      setSelectedLanguage(userProfile.targetLanguage);
      setCurrentView('vocabulary');
    }
  };

  const handleSentences = () => {
    if (userProfile?.targetLanguage) {
      setSelectedLanguage(userProfile.targetLanguage);
      setCurrentView('sentences');
    }
  };

  const handleStories = () => {
    if (userProfile?.targetLanguage) {
      setSelectedLanguage(userProfile.targetLanguage);
      setCurrentView('stories');
    }
  };

  const handleProgress = () => {
    setCurrentView('progress');
  };

  const handleProfile = () => {
    setCurrentView('profile');
  };

  const handleReadStory = (story: Story) => {
    setSelectedStory(story);
    setCurrentView('story-reader');
  };

  const handleStoryComplete = () => {
    // Mark story as completed and return to stories index
    setCurrentView('stories');
    setSelectedStory(null);
  };

  const handleQuickStudyVocabulary = (items: VocabularyItem[]) => {
    // Convert vocabulary items to flashcards and create a temporary deck
    const cards = items.map(item => ({
      id: item.id,
      front: item.translation,
      back: item.word
    }));

    const tempDeck: Deck = {
      id: 'temp-vocab-' + Date.now(),
      name: 'Quick Study - Vocabulary',
      description: `${items.length} vocabulary items`,
      languageCode: selectedLanguage?.code || '',
      cards,
      isBuiltIn: false,
      createdAt: new Date(),
      progress: { studied: 0, mastered: 0 }
    };

    setSelectedDeck(tempDeck);
    setCurrentView('study-selector');
  };

  const handleQuickStudySentences = (items: SentenceItem[]) => {
    // Convert sentence items to flashcards and create a temporary deck
    const cards = items.map(item => ({
      id: item.id,
      front: item.translation,
      back: item.sentence
    }));

    const tempDeck: Deck = {
      id: 'temp-sentences-' + Date.now(),
      name: 'Quick Study - Sentences',
      description: `${items.length} sentences`,
      languageCode: selectedLanguage?.code || '',
      cards,
      isBuiltIn: false,
      createdAt: new Date(),
      progress: { studied: 0, mastered: 0 }
    };

    setSelectedDeck(tempDeck);
    setCurrentView('study-selector');
  };

  const handleMarkAsKnown = (itemId: string) => {
    // This would update the vocabulary/sentence data
    console.log('Mark as known:', itemId);
  };

  const handleAddToDeck = (items: VocabularyItem[] | SentenceItem[]) => {
    // This would open a modal to select which deck to add to
    console.log('Add to deck:', items);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    setCurrentView('homepage');
  };

  // Simulate login/signup process
  const simulateAuth = (isLogin: boolean) => {
    setTimeout(() => {
      if (isLogin) {
        handleLoginSuccess();
      } else {
        handleSignUpSuccess();
      }
    }, 1500);
  };

  if (currentView === 'login') {
    return (
      <LoginPage
        onBack={handleBack}
        onSwitchToSignUp={handleSwitchToSignUp}
        onLoginSuccess={simulateAuth}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignUpPage
        onBack={handleBack}
        onSwitchToLogin={handleSwitchToLogin}
        onSignUpSuccess={simulateAuth}
      />
    );
  }

  if (currentView === 'onboarding') {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        onBack={handleBack}
      />
    );
  }

  if (currentView === 'dashboard' && userProfile) {
    return (
      <Dashboard
        user={userProfile}
        decks={allDecks}
        onStudyDeck={handleStudyDeck}
        onCreateDeck={handleCreateDeck}
        onBrowseDecks={handleBrowseDecks}
        onVocabulary={handleVocabulary}
        onSentences={handleSentences}
        onStories={handleStories}
        onProgress={handleProgress}
        onProfile={handleProfile}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  if (currentView === 'progress' && userProfile) {
    return (
      <ProgressPage
        user={userProfile}
        decks={allDecks}
        onBack={handleBack}
      />
    );
  }

  if (currentView === 'profile' && userProfile) {
    return (
      <ProfilePage
        user={userProfile}
        onBack={handleBack}
        onUpdateProfile={handleUpdateProfile}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === 'vocabulary' && selectedLanguage) {
    return (
      <VocabularyIndex
        language={selectedLanguage}
        onBack={handleBack}
        onQuickStudy={handleQuickStudyVocabulary}
        onMarkAsKnown={handleMarkAsKnown}
        onAddToDeck={handleAddToDeck}
      />
    );
  }

  if (currentView === 'sentences' && selectedLanguage) {
    return (
      <SentenceIndex
        language={selectedLanguage}
        onBack={handleBack}
        onQuickStudy={handleQuickStudySentences}
        onMarkAsKnown={handleMarkAsKnown}
        onAddToDeck={handleAddToDeck}
      />
    );
  }

  if (currentView === 'stories' && selectedLanguage) {
    return (
      <StoriesIndex
        language={selectedLanguage}
        onBack={handleBack}
        onReadStory={handleReadStory}
      />
    );
  }

  if (currentView === 'story-reader' && selectedStory) {
    return (
      <StoryReader
        story={selectedStory}
        onBack={handleBack}
        onComplete={handleStoryComplete}
      />
    );
  }

  if (currentView === 'homepage') {
    return (
      <Homepage
        onLanguageSelect={handleLanguageSelect}
        decks={allDecks}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    );
  }

  if (currentView === 'decks' && selectedLanguage) {
    return (
      <DeckBrowser
        language={selectedLanguage}
        decks={allDecks}
        onBack={handleBack}
        onStudy={handleStudyDeck}
        onCreateDeck={handleCreateDeck}
        onEditDeck={handleEditDeck}
      />
    );
  }

  if (currentView === 'study-selector' && selectedDeck) {
    return (
      <StudyModeSelector
        onModeSelect={handleStudyModeSelect}
        onBack={handleBack}
        deckName={selectedDeck.name}
        cardCount={selectedDeck.cards.length}
      />
    );
  }

  if (currentView === 'study' && selectedDeck) {
    return (
      <StudyMode
        deck={selectedDeck}
        onBack={handleBack}
        onComplete={handleStudyComplete}
      />
    );
  }

  if (currentView === 'srs-study' && selectedDeck) {
    return (
      <SRSStudyMode
        deck={selectedDeck}
        onBack={handleBack}
        onComplete={handleStudyComplete}
      />
    );
  }

  if (currentView === 'match' && selectedDeck) {
    return (
      <MatchMode
        deck={selectedDeck}
        onBack={handleBack}
        onComplete={handleStudyComplete}
      />
    );
  }

  if (currentView === 'multi-match' && selectedDeck) {
    return (
      <MultiMatchMode
        deck={selectedDeck}
        onBack={handleBack}
        onComplete={handleStudyComplete}
      />
    );
  }

  if (currentView === 'cloze' && selectedDeck) {
    return (
      <ClozeMode
        deck={selectedDeck}
        onBack={handleBack}
        onComplete={handleStudyComplete}
      />
    );
  }

  if ((currentView === 'create' || currentView === 'edit') && selectedLanguage) {
    return (
      <DeckCreator
        language={selectedLanguage}
        deck={editingDeck || undefined}
        onBack={handleBack}
        onSave={handleSaveDeck}
      />
    );
  }

  return null;
}

export default App;