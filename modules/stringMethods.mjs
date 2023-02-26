export function toSentenceCase(str) {
  return str[0].toUpperCase() + str.slice(1);
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

  for (const word of stripped.replace(/[.,!?:;]/g, "").split(" ")) {
    let count = result.get(word);
    if (count) count += 1;
    else count = 1;
    result.set(word, count);
  }

  return result;
}
