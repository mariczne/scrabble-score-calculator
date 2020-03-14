export function sortArrayByLengthDescending(arr) {
  const newArr = [...arr]
  return newArr.sort((prev, curr) => curr.length - prev.length);
}

export function findIndexOfSubarray(arr, subArr) {
  for (let i = 0; i < 1 + (arr.length - subArr.length); ++i) {
    if (subArr.every((element, j) => element === arr[i + j])) {
      return i;
    }
  }
  return -1;
}
