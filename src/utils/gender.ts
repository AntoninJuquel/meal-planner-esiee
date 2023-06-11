import { Gender } from '@/types/Gender';

export function genderBmr(gender: Gender, weight: number, height: number, age: number) {
  switch (gender) {
    case Gender.Male:
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    case Gender.Female:
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    default:
      return 0;
  }
}

export const genderIcons = {
  [Gender.Male]: 'gender-male',
  [Gender.Female]: 'gender-female',
};
