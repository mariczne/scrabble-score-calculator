import Letter from "./Letter";

describe("Letter", () => {
  describe("throws errors when incorrect arguments are supplied", () => {
    it("throws a TypeError when trying to create a letter with something else than string as either argument", () => {
      expect(() => new Letter(2, "pol")).toThrowError(TypeError);
    });

    it("throws a RangeError when trying to create a letter of unsupported language", () => {
      expect(() => new Letter("F", "xxx")).toThrowError(RangeError);
    });
  });

  it("calculates letter score for different supported languages", () => {
    const F_PL = new Letter("F", "pol");
    const F_EN = new Letter("F", "eng");

    expect(F_PL.score).toEqual(5);
    expect(F_EN.score).toEqual(4);
  });

  describe("sets the score multiplier", () => {
    test("throws a TypeError if scoreMultiplier is set to a non-integer number", () => {
      const F = new Letter("F", "pol");

      expect(() => (F.scoreMultiplier = 2.5)).toThrowError(TypeError);
    });

    test("throws a RangeError if scoreMultiplier is set to a negative number", () => {
      const F = new Letter("F", "pol");

      expect(() => (F.scoreMultiplier = -1)).toThrowError(RangeError);
    });

    test("throws a RangeError if scoreMultiplier is set to a number bigger than allowed", () => {
      const F = new Letter("F", "pol");

      expect(() => (F.scoreMultiplier = 5)).toThrowError(RangeError);
    });

    test("throws an error if trying to set scoreMultiplier on a letter with an invalid score", () => {
      const X = new Letter("X", "pol");

      expect(() => (X.scoreMultiplier = 2)).toThrowError(Error);
    });

    test("can set a bonus", () => {
      const F = new Letter("F", "pol");

      F.scoreMultiplier = 2;

      expect(F.scoreMultiplier).toEqual(2);
    });
  });

  it("calculates letter score with bonuses", () => {
    const F = new Letter("F", "pol");

    F.scoreMultiplier = 2;

    expect(F.score).toEqual(10);

    F.scoreMultiplier = 3;

    expect(F.score).toEqual(15);
  });

  it("correctly calculates score of a multigraph, including bonuses", () => {
    const SZ = new Letter("SZ", "hun");

    expect(SZ.score).toEqual(3);

    SZ.scoreMultiplier = 3;

    expect(SZ.score).toEqual(9);
  });
});
