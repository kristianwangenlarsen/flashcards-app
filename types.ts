export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  isGenerated: boolean;
}