import { ActivityLevel } from '@/types/ActivityLevel';
import { Gender } from '@/types/Gender';
import { HealthGoal } from '@/types/HealthGoal';

import { genderBmr } from './gender';
import { activityLevelMultipliers } from './activityLevel';
import { healthGoalMultipliers } from './healthGoal';

type Params = {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  goal: HealthGoal;
};

export function getBmr({ age, gender, height, weight, activityLevel, goal }: Params): number {
  return genderBmr(gender, weight, height, age) * activityLevelMultipliers[activityLevel] * healthGoalMultipliers[goal];
}
