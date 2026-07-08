export type WordFact = {
  key: string;
  value: string;
  label: string;
};

export type WordSource =
  | {
      type: 'manual' | 'imported';
      name?: string;
    }
  | {
      type: 'sudachi';
      name?: string;
    };

export type ReviewStatus = 'approved' | 'needs_review' | 'rejected';

export type KanaInfo = {
  first: string;
  last: string;
  length: number;
};

export type WordEntry = {
  id: string;
  word: string;
  reading: string;
  normalized: string;
  mainCategory: string;
  categories: string[];
  facts: WordFact[];
  hints?: string[];
  kana: KanaInfo;
  source: WordSource;
  reviewStatus: ReviewStatus;
};

export type WordCandidate = {
  id: string;
  word: string;
  reading: string;
  normalized: string;
  kana: KanaInfo;
  source: {
    type: 'sudachi';
    dictionary: 'core' | 'small';
  };
  autoFlags: string[];
  reviewStatus: 'needs_review';
};

export type AnswerPoolBand = 'very_large' | 'large' | 'medium' | 'small' | 'tiny';

export type Challenge = {
  id: string;
  label: string;
  conditions: {
    categories?: string[];
    facts?: {
      key: string;
      value: string;
    }[];
    kana?: {
      first?: string;
      last?: string;
      length?: number;
    };
  };
  answerCount?: number;
  answerPoolBand?: AnswerPoolBand;
};
