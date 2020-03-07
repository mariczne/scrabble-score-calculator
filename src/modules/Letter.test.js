import Letter from "./Letter";

describe("throws errors when incorrect arguments are supplied", () => {
  it("throws a TypeError when trying to create a letter with something else than string as either argument", () => {
    expect(() => new Letter(2, "PL")).toThrowError(TypeError);
  });

  it("throws a RangeError when trying to create a letter of unsupported language", () => {
    expect(() => new Letter("F", "XX")).toThrowError(RangeError);
  });
});

describe("correctly calculates letter score for different supported languages", () => {
  it("F is worth 5 points in Polish", () => {
    expect(new Letter("F", "PL").score).toEqual(5);
  });

  it("F is worth 4 points in English", () => {
    expect(new Letter("F", "EN").score).toEqual(4);
  });
});

describe("correctly sets the score multiplier", () => {
  it("throws a TypeError if scoreMultiplier is set to a non-integer number", () => {
    expect(() => new Letter("F", "PL").scoreMultiplier = 2.5).toThrowError(TypeError);
  });

  it("throws a RangeError if scoreMultiplier is set to a negative number", () => {
    expect(() => new Letter("F", "PL").scoreMultiplier = -1).toThrowError(RangeError);
  });

  it("throws a RangeError if scoreMultiplier is set to a number bigger than allowed", () => {
    expect(() => new Letter("F", "PL").scoreMultiplier = 5).toThrowError(RangeError);
  });
  it("can set a triple bonus", () => {
    const F = new Letter("F", "PL");
    expect(F.score).toEqual(5);
    F.scoreMultiplier = 3;
    expect(F.score).toEqual(15);
  });
});

describe("correctly cycles letter score bonuses", () => {
  it("F with its bonus cycled is worth 10 points in Polish", () => {
    const F = new Letter("F", "PL");
    F.cycleBonus();
    expect(F.score).toEqual(10);
  });

  it("F with its bonus cycled twice is worth 15 points in Polish", () => {
    const F = new Letter("F", "PL");
    F.cycleBonus();
    F.cycleBonus();
    expect(F.score).toEqual(15);
  });

  it("F with its bonus cycled three times is worth 5 points in Polish", () => {
    const F = new Letter("F", "PL");
    F.cycleBonus();
    F.cycleBonus();
    F.cycleBonus();
    expect(F.score).toEqual(5);
  });
});

describe("correctly calculates score of a digraph", () => {
  it("SZ is worth 3 points in Hungarian", () => {
    const SZ = new Letter("SZ", "HU");
    expect(SZ.score).toEqual(3);
  });

  it("SZ with triple bonus is worth 9 points in Hungarian", () => {
    const SZ = new Letter("SZ", "HU");
    SZ.scoreMultiplier = 3;
    expect(SZ.score).toEqual(9);
  });
});
