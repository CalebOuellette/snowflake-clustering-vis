const names = [
  "caleb",
  "suet",
  "michael",
  "cathy",
  "william",
  "yi",
  "nick",
  "clarence",
  "ricardo",
  "peter",
  "ruben",
  "rohan",
  "chalmers",
  "celine",
];

const dataSetSize = 42;

const result = [];

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

for (let i = 0; i < dataSetSize; i++) {

  const s = names[Math.floor(Math.random() * names.length)]
  let r = s;
  while (r === s){
    r = names[Math.floor(Math.random() * names.length)]
  }

  result.push({
    id: i,
    external_id: makeid(4),
    sender: s,
    receiver: r,
    amount: Math.floor(Math.random() * 1000),
  });
}

console.log(JSON.stringify(result));
