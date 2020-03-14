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

    expect(F_PL.getScore()).toEqual(5);
    expect(F_EN.getScore()).toEqual(4);
  });

  describe("sets the score multiplier", () => {
    test("throws a TypeError if scoreMultiplier is set to a non-integer number", () => {
      const F = new Letter("F", "pol");

      expect(() => (F.setScoreMultiplier(2.5))).toThrowError(TypeError);
    });

    test("throws a RangeError if scoreMultiplier is set to a negative number", () => {
      const F = new Letter("F", "pol");

      expect(() => (F.setScoreMultiplier(-1))).toThrowError(RangeError);
    });

    test("throws a RangeError if scoreMultiplier is set to a number bigger than allowed", () => {
      const F = new Letter("F", "pol");

      expect(() => (F.setScoreMultiplier(5))).toThrowError(RangeError);
    });

    test("throws an error if trying to set scoreMultiplier on a letter with an invalid score", () => {
      const X = new Letter("X", "pol");

      expect(() => (X.setScoreMultiplier(2))).toThrowError(Error);
    });

    test("can set a bonus", () => {
      const F = new Letter("F", "pol");

      F.setScoreMultiplier(2);

      expect(F.getScoreMultiplier()).toEqual(2);
    });
  });

  it("calculates letter score with bonuses", () => {
    const F = new Letter("F", "pol");

    F.setScoreMultiplier(2);

    expect(F.getScore()).toEqual(10);

    F.setScoreMultiplier(3);

    expect(F.getScore()).toEqual(15);
  });

  it("correctly calculates score of a multigraph, including bonuses", () => {
    const SZ = new Letter("SZ", "hun");

    expect(SZ.getScore()).toEqual(3);

    SZ.setScoreMultiplier(3);

    expect(SZ.getScore()).toEqual(9);
  });
});
