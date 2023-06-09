import { ActivityLevel } from '@/types/ActivityLevel';

export function activityLevelMultiplier(activityLevel: ActivityLevel): number {
  switch (activityLevel) {
    case ActivityLevel.SEDENTARY:
      return 1.2;
    case ActivityLevel.LIGHT:
      return 1.375;
    case ActivityLevel.MODERATE:
      return 1.55;
    case ActivityLevel.VERY_ACTIVE:
      return 1.725;
    case ActivityLevel.SUPER_ACTIVE:
      return 1.9;
    default:
      return 1;
  }
}

export function activityLevelIcon(activityLevel: ActivityLevel): string {
  switch (activityLevel) {
    case ActivityLevel.SEDENTARY:
      return 'seat-passenger';
    case ActivityLevel.LIGHT:
      return 'walk';
    case ActivityLevel.MODERATE:
      return 'bike';
    case ActivityLevel.VERY_ACTIVE:
      return 'run';
    case ActivityLevel.SUPER_ACTIVE:
      return 'run-fast';
    default:
      return '';
  }
}
