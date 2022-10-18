function solution(D) {
  console.log("Input", D);
  const ValueArray = new Array(7);

  for (let Date of D.keys()) {
    const date = new window.Date(Date);
    let day = date.getDay();
    if (day === 0) {
      day = 7;
    }

    ValueArray[day - 1] = ValueArray[day - 1]
      ? ValueArray[day - 1] + D.get(Date)
      : 0 + D.get(Date);
  }

  for (i = 0; i < 7; i++) {
    let emptyDays = 0;
    let temp = i;

    if (!ValueArray[i]) {
      while (!ValueArray[temp]) {
        emptyDays++;
        temp++;
      }

      for (let j = 1, k = emptyDays; j <= emptyDays; j++, k--) {
        ValueArray[i + j - 1] = parseInt(
          (k / (k + 1)) * ValueArray[i + j - 2] +
            (1 / (k + 1)) * ValueArray[i + emptyDays]
        );
      }
    }
  }

  const Output = new Map([
    ["Mon", ValueArray[0]],
    ["Tue", ValueArray[1]],
    ["Wed", ValueArray[2]],
    ["Thu", ValueArray[3]],
    ["Fri", ValueArray[4]],
    ["Sat", ValueArray[5]],
    ["Sun", ValueArray[6]],
  ]);
  console.log("Output", Output);

  return Output;
}

function Test(Output, Expected) {
  const keys1 = Array.from(Output.keys());
  const keys2 = Array.from(Expected.keys());

  let match = true;
  if (keys1.length !== keys2.length) {
    console.log("❌ Test Case Failed");
    console.log("----------------------------------------------------------");
    return false;
  }

  for (const key of keys1) {
    if (Output.get(key) !== Expected.get(key)) {
      match = false;
      console.log("❌ Test Case Failed");
      console.log("----------------------------------------------------------");
      return false;
    }
  }

  console.log("✔️ Test Case Passed");
  console.log("----------------------------------------------------------");

  return match;
}

const test1 = solution(
  new Map([
    ["2020-01-01", 6],
    ["2020-01-04", 12],
    ["2020-01-05", 14],
    ["2020-01-06", 2],
    ["2020-01-07", 4],
  ])
);

Test(
  test1,
  new Map([
    ["Mon", 2],
    ["Tue", 4],
    ["Wed", 6],
    ["Thu", 8],
    ["Fri", 10],
    ["Sat", 12],
    ["Sun", 14],
  ])
);

const test2 = solution(
  new Map([
    ["2020-01-05", 14],
    ["2020-01-06", 2],
  ])
);

Test(
  test2,
  new Map([
    ["Mon", 2],
    ["Tue", 4],
    ["Wed", 6],
    ["Thu", 8],
    ["Fri", 10],
    ["Sat", 12],
    ["Sun", 14],
  ])
);
