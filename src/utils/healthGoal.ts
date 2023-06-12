import { HealthGoal } from '@/types/HealthGoal';

export const healthGoalMultipliers = {
  [HealthGoal.LOSE]: 0.9, // 10% deficit
  [HealthGoal.MAINTAIN]: 1, // 0% deficit
  [HealthGoal.GAIN]: 1.1, // 10% surplus
};

export const healthGoalIcons = {
  [HealthGoal.LOSE]: 'numeric-negative-1',
  [HealthGoal.MAINTAIN]: 'numeric-0',
  [HealthGoal.GAIN]: 'numeric-positive-1',
};
