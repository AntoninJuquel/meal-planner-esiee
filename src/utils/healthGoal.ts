import { HealthGoal } from '@/types/HealthGoal';

export const healthGoalTerms = {
  [HealthGoal.LOSE]: -500,
  [HealthGoal.MAINTAIN]: 0,
  [HealthGoal.GAIN]: 500,
};

export const healthGoalIcons = {
  [HealthGoal.LOSE]: 'numeric-negative-1',
  [HealthGoal.MAINTAIN]: 'numeric-0',
  [HealthGoal.GAIN]: 'numeric-positive-1',
};
