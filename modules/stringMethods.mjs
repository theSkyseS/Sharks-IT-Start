export function toSentenceCase(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function stripExtraSpaces(str) {
  return str.replace(/\s*([.,!?:;])\s*|\s+/gm, "$1 ").trim();
}

export function countWords(str) {
  return stripExtraSpaces(str)
    .split(" ")
    .filter((x) => x).length;
}

export function countUniqueWords(str) {
  let result = new Map();
  let stripped = stripExtraSpaces(str.toLowerCase());

  return stripped
    .replace(/[.,!?:;]/g, "")
    .split(" ")
    .reduce((result, word) => {
      const count = result.get(word);

      return result.set(word, count ? count + 1 : 1);
    }, new Map());
}
