export function interpolateColor(value: number): string {
  let red: number, green: number, blue: number;

  if (value < 0.5) {
    red = 255;
    green = Math.round(510 * value);
  } else if (value < 0.9) {
    red = Math.round((255 * (0.9 - value)) / 0.4);
    green = 255;
  } else if (value < 1.1) {
    red = 0;
    green = 255;
  } else if (value < 1.5) {
    red = Math.round((255 * (value - 1.1)) / 0.4);
    green = 255 - Math.round((255 * (value - 1.1)) / 0.4);
  } else {
    red = 255;
    green = 0;
  }

  blue = 0;

  return `rgb(${red}, ${green}, ${blue})`;
}
