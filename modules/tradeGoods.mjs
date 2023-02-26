export class tradeGood {
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
  static operations = {
    contains: (str, x) => str.includes(x),
    starts: (str, x) => str.startsWith(x),
    ends: (str, x) => str.endsWith(x),
    ">": (number, x) => +number > +x,
    "=": (number, x) => +number === +x,
    "<": (number, x) => +number < +x,
    ">=": (number, x) => +number >= +x,
    "<=": (number, x) => +number <= +x,
  };
}

export function filterGoods(goodsArray, str) {
  let resultArray = [];
  let parsed = parseQuery(str);
  for (const elem of goodsArray) {
    let include = true;
    for (const predicate of parsed) {
      let { operator, fieldName, parameter } = predicate;
      include &&= tradeGood.operations[operator](elem[fieldName], parameter);
    }
    if (include) resultArray.push(elem);
  }
  return resultArray;
}

function parseQuery(str) {
  let stringMethods = ["contains", "starts", "ends"];
  let parsed = [];
  let splitString = str.split("&").map((x) => x.split("-"));
  for (const predicate of splitString) {
    let fieldName = predicate[0];
    let operator, parameter;
    if (stringMethods.includes(predicate[1])) {
      operator = predicate[1];
      parameter = predicate[2];
    } else {
      let separate = predicate[1].match(/(\S+?)(\d+)/);
      //todo проверка
      operator = separate[1];
      parameter = +separate[2];
    }
    parsed.push({ operator, fieldName, parameter });
  }
  return parsed;
}

let goodA = new tradeGood("fdgoodA", 2, 10, "aaabc");
let goodB = new tradeGood("goodB", 10, 3, "bca");
let goodC = new tradeGood("goodCfd", 2, 3, "aabbcc");

let goodsArray = [goodA, goodB, goodC];
let query = "name-contains-fd&price-=2&quantity->5&description-ends-abc";

console.log(parseQuery(query));

console.log(filterGoods(goodsArray, query));
