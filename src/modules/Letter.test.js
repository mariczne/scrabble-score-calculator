import Letter from "./Letter";

describe("Letter", () => {
  describe("throws errors when incorrect arguments are supplied", () => {
    it("throws a TypeError when trying to create a letter with something else than string as either argument", () => {
      expect(() => new Letter(2, "PL")).toThrowError(TypeError);
    });

    it("throws a RangeError when trying to create a letter of unsupported language", () => {
      expect(() => new Letter("F", "XX")).toThrowError(RangeError);
    });
  });

  it("calculates letter score for different supported languages", () => {
    expect(new Letter("F", "PL").score).toEqual(5);
    expect(new Letter("F", "EN").score).toEqual(4);
  });

  describe("sets the score multiplier", () => {
    test("throws a TypeError if scoreMultiplier is set to a non-integer number", () => {
      expect(() => (new Letter("F", "PL").scoreMultiplier = 2.5)).toThrowError(
        TypeError
      );
    });

    test("throws a RangeError if scoreMultiplier is set to a negative number", () => {
      expect(() => (new Letter("F", "PL").scoreMultiplier = -1)).toThrowError(
        RangeError
      );
    });

    test("throws a RangeError if scoreMultiplier is set to a number bigger than allowed", () => {
      expect(() => (new Letter("F", "PL").scoreMultiplier = 5)).toThrowError(
        RangeError
      );
    });
    test("can set a triple bonus", () => {
      const F = new Letter("F", "PL");
      F.scoreMultiplier = 3;
      expect(F.scoreMultiplier).toEqual(3);
    });
  });

  it("calculates letter score with bonuses", () => {
    const F = new Letter("F", "PL");
    F.scoreMultiplier = 2;
    expect(F.score).toEqual(10);
    F.scoreMultiplier = 3;
    expect(F.score).toEqual(15);
  });

  it("correctly calculates score of a digraph", () => {
    const SZ = new Letter("SZ", "HU");
    expect(SZ.score).toEqual(3);
    SZ.scoreMultiplier = 3;
    expect(SZ.score).toEqual(9);
  });
});
