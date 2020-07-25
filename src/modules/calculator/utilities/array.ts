export function sortArrayByLengthDescending<T extends Array<any> | string>(
  arr: T[]
): T[] {
  return [...arr].sort((prev, curr) => curr.length - prev.length);
}

export function findIndexOfSubarray<T>(arr: T[], subArr: T[]): number {
  for (let i = 0; i < 1 + (arr.length - subArr.length); ++i) {
    if (subArr.every((element, j) => element === arr[i + j])) {
      return i;
    }
  }
  return -1;
}

export function joinSubarrayIntoSingleElement<T>(arr: T[], subArr: T[]): T[] {
  const subArrIndexAt = findIndexOfSubarray(arr, subArr);
  if (subArrIndexAt !== -1) {
    return [
      ...arr.slice(0, subArrIndexAt),
      subArr.join(""),
      ...arr.slice(subArrIndexAt + subArr.length, arr.length),
    ] as T[];
  }
  return [...arr];
}

export function joinAllSubarraysIntoSingleElements<T>(
  arr: T[],
  subArr: T[]
): T[] {
  const subArrIndexAt = findIndexOfSubarray(arr, subArr);
  if (subArrIndexAt === -1) {
    return [...arr];
  }
  return joinAllSubarraysIntoSingleElements(
    joinSubarrayIntoSingleElement(arr, subArr),
    subArr
  );
}
