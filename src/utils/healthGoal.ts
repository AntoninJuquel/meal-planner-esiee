import { HealthGoal } from '@/types/HealthGoal';

export function healthGoalIcon(healthGoal: HealthGoal) {
  switch (healthGoal) {
    case HealthGoal.LOSE:
      return 'numeric-negative-1';
    case HealthGoal.MAINTAIN:
      return 'numeric-0';
    case HealthGoal.GAIN:
      return 'numeric-positive-1';
    default:
      return '';
  }
}
