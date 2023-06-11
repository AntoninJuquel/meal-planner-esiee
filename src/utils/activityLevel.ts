import { ActivityLevel } from '@/types/ActivityLevel';

export const activityLevelMultipliers = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
  [ActivityLevel.SUPER_ACTIVE]: 1.9,
};

export const activityLevelIcons = {
  [ActivityLevel.SEDENTARY]: 'seat-passenger',
  [ActivityLevel.LIGHT]: 'walk',
  [ActivityLevel.MODERATE]: 'bike',
  [ActivityLevel.VERY_ACTIVE]: 'run',
  [ActivityLevel.SUPER_ACTIVE]: 'run-fast',
};
