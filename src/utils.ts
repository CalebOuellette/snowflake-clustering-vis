import { Event } from "./Types";

export function splitToChunks<T>(array: T[], parts: number) {
  const arrayCopy = [...array];
  let result = [];
  for (let i = parts; i > 0; i--) {
    result.push(arrayCopy.splice(0, Math.ceil(arrayCopy.length / i)));
  }
  return result;
}

export const findMax = (events: Event[], key: keyof Event) => {
  if (events.length < 1) {
    return ["", ""];
  }
  let min = events[0][key];
  let max = events[0][key];

  events.forEach((e) => {
    if (e[key] > max) {
      max = e[key];
    }
    if (e[key] < min) {
      min = e[key];
    }
  });
  return [min, max];
};
