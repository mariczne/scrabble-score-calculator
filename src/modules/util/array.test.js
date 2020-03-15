import {
  sortArrayByLengthDescending,
  findIndexOfSubarray,
  joinSubarrayIntoSingleElement
} from "./array";

describe("sortArrayByLengthDescending", () => {
  it("should return a new array", () => {
    const arr = ["a", "bb", "ccc"];
    const arrSorted = sortArrayByLengthDescending(arr);

    expect(arr).not.toBe(arrSorted);
  });

  it("should return an array sorted by length of its elements, descending", () => {
    const arr = ["a", "bb", "ccc"];
    const arrSorted = sortArrayByLengthDescending(arr);
    const desiredArr = ["ccc", "bb", "a"];

    expect(arrSorted).toEqual(desiredArr);
  });
});

describe("findIndexOfSubarray", () => {
  it("should return -1 if a contiguous subarray could not be found", () => {
    const arr = ["a", "b", "c"];
    const subArr = ["a", "c"];

    expect(findIndexOfSubarray(arr, subArr)).toEqual(-1);
  });

  it("should return index at which contiguous subarray begins in main array", () => {
    const arr = ["a", "b", "c", "d", "e"];
    const subArr = ["b", "c", "d"];

    expect(findIndexOfSubarray(arr, subArr)).toEqual(1);
  });
});

describe("joinSubarrayIntoSingleElement", () => {
  it("should return a new array", () => {
    const arrBefore = Array.from("test".toUpperCase());
    const subArr = ["S", "Z"];

    expect(joinSubarrayIntoSingleElement(arrBefore, subArr)).not.toBe(arrBefore);
  });

  it("should join the elements of a first found contiguous subarray", () => {
    const arrBefore = Array.from("boszo".toUpperCase());
    const arrAfter = ["B", "O", "SZ", "O"];
    const subArr = ["S", "Z"];
    
    expect(joinSubarrayIntoSingleElement(arrBefore, subArr)).toEqual(arrAfter);
  });
});
