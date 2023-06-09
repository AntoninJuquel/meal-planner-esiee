import { Gender } from "@/types/Gender";

export function genderIcon(gender: Gender){
  switch (gender) {
    case Gender.Female:
      return 'gender-female';
    case Gender.Male:
      return 'gender-male';
    default:
      return '';
  }
}