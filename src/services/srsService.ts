import { FlashCard, SRSCardData, SRSReviewResult, SRSStats, SRSSettings } from '../types';

export class SRSService {
  private static readonly DEFAULT_SETTINGS: SRSSettings = {
    maxNewCardsPerDay: 20,
    maxReviewsPerDay: 100,
    easyBonus: 1.3,
    hardPenalty: 0.8,
    graduatingInterval: 1,
    easyInterval: 4,
    maximumInterval: 36500, // ~100 years
    minimumInterval: 1
  };

  // Initialize SRS data for a new card
  static initializeCard(card: FlashCard): FlashCard {
    if (card.srsData) return card;

    return {
      ...card,
      srsData: {
        interval: 0,
        repetitions: 0,
        easeFactor: 2.5,
        nextReviewDate: new Date(),
        isNew: true,
        totalReviews: 0,
        correctStreak: 0,
        averageQuality: 0,
        quality: 0
      }
    };
  }

  // Calculate next review date based on SM-2 algorithm
  static calculateNextReview(
    card: FlashCard, 
    quality: number, // 0-5 rating
    settings: SRSSettings = this.DEFAULT_SETTINGS
  ): { updatedCard: FlashCard; reviewResult: SRSReviewResult } {
    if (!card.srsData) {
      card = this.initializeCard(card);
    }

    const srsData = card.srsData!;
    const wasCorrect = quality >= 3;
    const previousInterval = srsData.interval;
    const reviewDate = new Date();

    let newInterval = srsData.interval;
    let newEaseFactor = srsData.easeFactor;
    let newRepetitions = srsData.repetitions;

    // Update average quality
    const totalQualityPoints = srsData.averageQuality * srsData.totalReviews + quality;
    const newAverageQuality = totalQualityPoints / (srsData.totalReviews + 1);

    if (wasCorrect) {
      // Correct answer
      if (srsData.isNew) {
        // New card graduation
        if (quality === 5) {
          // Easy - skip to easy interval
          newInterval = settings.easyInterval;
        } else {
          // Good - use graduating interval
          newInterval = settings.graduatingInterval;
        }
        newRepetitions = 1;
      } else {
        // Review card
        if (srsData.repetitions === 0) {
          newInterval = 1;
        } else if (srsData.repetitions === 1) {
          newInterval = 6;
        } else {
          newInterval = Math.round(srsData.interval * srsData.easeFactor);
        }
        newRepetitions = srsData.repetitions + 1;
      }

      // Apply quality modifiers
      if (quality === 5) {
        // Easy
        newInterval = Math.round(newInterval * settings.easyBonus);
        newEaseFactor = Math.min(2.5, srsData.easeFactor + 0.15);
      } else if (quality === 4) {
        // Good
        newEaseFactor = srsData.easeFactor;
      } else if (quality === 3) {
        // Hard
        newInterval = Math.round(newInterval * settings.hardPenalty);
        newEaseFactor = Math.max(1.3, srsData.easeFactor - 0.15);
      }
    } else {
      // Incorrect answer - reset to beginning
      newInterval = 1;
      newRepetitions = 0;
      newEaseFactor = Math.max(1.3, srsData.easeFactor - 0.2);
    }

    // Apply interval constraints
    newInterval = Math.max(settings.minimumInterval, Math.min(settings.maximumInterval, newInterval));

    // Calculate next review date
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

    const updatedCard: FlashCard = {
      ...card,
      srsData: {
        ...srsData,
        interval: newInterval,
        repetitions: newRepetitions,
        easeFactor: newEaseFactor,
        nextReviewDate,
        lastReviewDate: reviewDate,
        quality,
        isNew: false,
        totalReviews: srsData.totalReviews + 1,
        correctStreak: wasCorrect ? srsData.correctStreak + 1 : 0,
        averageQuality: newAverageQuality
      }
    };

    const reviewResult: SRSReviewResult = {
      cardId: card.id,
      quality,
      timeSpent: 0, // This would be tracked by the UI
      wasCorrect,
      previousInterval,
      newInterval,
      reviewDate
    };

    return { updatedCard, reviewResult };
  }

  // Get cards due for review
  static getCardsForReview(
    cards: FlashCard[], 
    settings: SRSSettings = this.DEFAULT_SETTINGS
  ): { newCards: FlashCard[]; reviewCards: FlashCard[] } {
    const now = new Date();
    const newCards: FlashCard[] = [];
    const reviewCards: FlashCard[] = [];

    cards.forEach(card => {
      const srsCard = card.srsData ? card : this.initializeCard(card);
      
      if (srsCard.srsData!.isNew) {
        newCards.push(srsCard);
      } else if (srsCard.srsData!.nextReviewDate <= now) {
        reviewCards.push(srsCard);
      }
    });

    // Limit cards based on settings
    const limitedNewCards = newCards.slice(0, settings.maxNewCardsPerDay);
    const limitedReviewCards = reviewCards.slice(0, settings.maxReviewsPerDay);

    return {
      newCards: limitedNewCards,
      reviewCards: limitedReviewCards
    };
  }

  // Calculate SRS statistics for a deck
  static calculateStats(cards: FlashCard[]): SRSStats {
    const now = new Date();
    let totalCards = 0;
    let newCards = 0;
    let reviewCards = 0;
    let masteredCards = 0;
    let totalEaseFactor = 0;
    let totalCorrect = 0;
    let totalReviews = 0;
    let dailyReviews = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    cards.forEach(card => {
      if (!card.srsData) return;
      
      totalCards++;
      const srsData = card.srsData;

      if (srsData.isNew) {
        newCards++;
      } else if (srsData.nextReviewDate <= now) {
        reviewCards++;
      } else if (srsData.interval >= 21) {
        // Consider cards with 21+ day intervals as "mastered"
        masteredCards++;
      }

      totalEaseFactor += srsData.easeFactor;
      totalCorrect += srsData.correctStreak;
      totalReviews += srsData.totalReviews;

      // Count reviews done today
      if (srsData.lastReviewDate && srsData.lastReviewDate >= today) {
        dailyReviews++;
      }
    });

    const averageEaseFactor = totalCards > 0 ? totalEaseFactor / totalCards : 2.5;
    const retentionRate = totalReviews > 0 ? (totalCorrect / totalReviews) * 100 : 0;

    return {
      totalCards,
      newCards,
      reviewCards,
      masteredCards,
      averageEaseFactor,
      retentionRate,
      dailyReviews,
      streakDays: 0 // This would need to be calculated from historical data
    };
  }

  // Get optimal study session
  static getOptimalStudySession(
    cards: FlashCard[],
    targetMinutes: number = 15,
    settings: SRSSettings = this.DEFAULT_SETTINGS
  ): FlashCard[] {
    const { newCards, reviewCards } = this.getCardsForReview(cards, settings);
    
    // Prioritize reviews over new cards
    const sessionCards: FlashCard[] = [];
    
    // Add review cards first (they're more important)
    sessionCards.push(...reviewCards);
    
    // Add new cards if we have room
    const remainingSlots = Math.max(0, 20 - sessionCards.length); // Target ~20 cards per session
    sessionCards.push(...newCards.slice(0, remainingSlots));
    
    // Shuffle to avoid predictable order
    return this.shuffleArray(sessionCards);
  }

  // Utility function to shuffle array
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Export SRS data for backup
  static exportSRSData(cards: FlashCard[]): string {
    const srsData = cards.map(card => ({
      cardId: card.id,
      srsData: card.srsData
    }));
    return JSON.stringify(srsData, null, 2);
  }

  // Import SRS data from backup
  static importSRSData(cards: FlashCard[], importData: string): FlashCard[] {
    try {
      const srsDataArray = JSON.parse(importData);
      const srsDataMap = new Map(srsDataArray.map((item: any) => [item.cardId, item.srsData]));
      
      return cards.map(card => ({
        ...card,
        srsData: srsDataMap.get(card.id) || card.srsData
      }));
    } catch (error) {
      console.error('Error importing SRS data:', error);
      return cards;
    }
  }
}

export const srsService = SRSService;