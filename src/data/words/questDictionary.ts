import challengesJson from './challenges.quest.json' with { type: 'json' };
import wordsJson from './words.quest.json' with { type: 'json' };
import type { Challenge, WordEntry } from './wordTypes.ts';

export const questWords = wordsJson as WordEntry[];
export const questChallenges = challengesJson as Challenge[];
export const approvedQuestWords = questWords.filter((word) => word.reviewStatus === 'approved');
