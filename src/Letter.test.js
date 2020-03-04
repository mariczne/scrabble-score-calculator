import Letter from "./Letter";

test("F is worth 5 points in Polish", () => {
  const F = new Letter("F", "PL");
  expect(F.score).toEqual(5);
});

test("F is worth 4 points in English", () => {
  const F = new Letter("F", "EN");
  expect(F.score).toEqual(4);
});

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