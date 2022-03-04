import React from 'react';

export enum TestStatusType {
  Ready = 'Ready',
  InProgress = 'In Progress',
  Complete = 'Complete',
}

export type Questions = {
  en: {
    sentence1: string;
    sentence2: string;
    answer: string;
  };
  de: {
    sentence1: string;
    sentence2: string;
    answer: string;
    answers: string[];
  };
};

export interface QuestionsProps {
  questions?: Questions[];
  questionIndex?: number;
  testStatus?: TestStatusType;
  setTestStatus?: React.Dispatch<React.SetStateAction<TestStatusType>>;
  correctFit?: boolean;
  selectedAnswer?: string;
  onPressAnswer?: (answer: string) => void;
  onStart?: () => void;
  onNextQuestion?: () => void;
  onPressAnswerNext?: () => void;
}
