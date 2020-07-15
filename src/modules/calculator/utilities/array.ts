export function sortArrayByLengthDescending(arr: any[]): any[] {
  return [...arr].sort((prev, curr) => curr.length - prev.length);
}

export function findIndexOfSubarray(arr: any[], subArr: any[]): number {
  for (let i = 0; i < 1 + (arr.length - subArr.length); ++i) {
    if (subArr.every((element, j) => element === arr[i + j])) {
      return i;
    }
  }
  return -1;
}

export function joinSubarrayIntoSingleElement(
  arr: any[],
  subArr: any[]
): any[] {
  const subArrIndexAt = findIndexOfSubarray(arr, subArr);
  if (subArrIndexAt !== -1) {
    return [
      ...arr.slice(0, subArrIndexAt),
      subArr.join(""),
      ...arr.slice(subArrIndexAt + subArr.length, arr.length),
    ];
  }
  return [...arr];
}

export function joinAllSubarraysIntoSingleElements(
  arr: any[],
  subArr: any[]
): any[] {
  const subArrIndexAt = findIndexOfSubarray(arr, subArr);
  if (subArrIndexAt === -1) {
    return [...arr];
  }
  return joinAllSubarraysIntoSingleElements(
    joinSubarrayIntoSingleElement(arr, subArr),
    subArr
  );
}
