import Letter from "./Letter";

describe("throws errors when incorrect arguments are supplied", () => {
  test("trying to create a letter with something else than strings as arguments fails", () => {
    expect(() => new Letter(2, "PL")).toThrowError(TypeError);
  });

  test("trying to create a letter of unsupported language fails", () => {
    expect(() => new Letter("F", "XX")).toThrowError(RangeError);
  });
});

describe("correctly calculates letter score for different supported languages", () => {
  test("F is worth 5 points in Polish", () => {
    const F = new Letter("F", "PL");
    expect(F.score).toEqual(5);
  });

  test("F is worth 4 points in English", () => {
    const F = new Letter("F", "EN");
    expect(F.score).toEqual(4);
  });
});

describe("correctly calculates letter score with bonuses", () => {
  test("F clicked (with doubled letter score) is worth 10 points in Polish", () => {
    const F = new Letter("F", "PL");
    F.toggleBonus();
    expect(F.score).toEqual(10);
  });

  test("F clicked two times (with tripled letter score) is worth 15 points in Polish", () => {
    const F = new Letter("F", "PL");
    F.toggleBonus();
    F.toggleBonus();
    expect(F.score).toEqual(15);
  });

  test("F clicked three times is worth 5 points in Polish", () => {
    const F = new Letter("F", "PL");
    F.toggleBonus();
    F.toggleBonus();
    F.toggleBonus();
    expect(F.score).toEqual(5);
  });
});

describe("correctly calculates score of a digraph", () => {
  test("SZ is worth 3 points in Hungarian", () => {
    const F = new Letter("SZ", "HU");
    expect(F.score).toEqual(3);
  });
});
