export const Add = convertToBigIntAdapter((a, b) => a + b);

export const Substract = convertToBigIntAdapter((a, b) => a - b);

export const Multiply = convertToBigIntAdapter((a, b) => a * b);

export const Divide = convertToBigIntAdapter((a, b) => a / b);

const convertToBigIntAdapter = cb => {
  return (a, b) => cb(BigInt(a), BigInt(b));
};
