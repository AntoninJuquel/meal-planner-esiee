import { ActivityLevel } from '@/types/ActivityLevel';
import { Gender } from '@/types/Gender';
import { HealthGoal } from '@/types/HealthGoal';

type Params = {
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  goal: HealthGoal;
};

export function calculateBMR({ age, gender, height, weight, activityLevel, goal }: Params): number {
  let bmr = 0;
  switch (gender) {
    case Gender.Male:
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      break;

    case Gender.Female:
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      break;
    default:
      break;
  }

  switch (activityLevel) {
    case ActivityLevel.SEDENTARY:
      bmr *= 1.2;
      break;
    case ActivityLevel.LIGHT:
      bmr *= 1.375;
      break;
    case ActivityLevel.MODERATE:
      bmr *= 1.55;
      break;
    case ActivityLevel.VERY_ACTIVE:
      bmr *= 1.725;
      break;
    case ActivityLevel.SUPER_ACTIVE:
      bmr *= 1.9;
      break;
    default:
      break;
  }

  switch (goal) {
    case HealthGoal.LOSE:
      bmr -= 500;
      break;
    case HealthGoal.GAIN:
      bmr += 500;
      break;
    default:
      break;
  }

  return bmr;
}
