export function sortArrayByLengthDescending(arr) {
  return [...arr].sort((prev, curr) => curr.length - prev.length);
}

export function findIndexOfSubarray(arr, subArr) {
  for (let i = 0; i < 1 + (arr.length - subArr.length); ++i) {
    if (subArr.every((element, j) => element === arr[i + j])) {
      return i;
    }
  }
  return -1;
}

export function joinSubarrayIntoSingleElement(arr, subArr) {
  const newArr = [...arr];
  const subArrIndexAt = findIndexOfSubarray(newArr, subArr);
  if (subArrIndexAt !== -1) {
    newArr.splice(subArrIndexAt, subArr.length, subArr.join(""));
  }
  return newArr;
}
