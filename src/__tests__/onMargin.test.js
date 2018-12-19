import { marginStart, marginEnd } from "../functions/onMargin";

describe("Margin calculations", () => {
  it("Should calculate the right marginTop and marginLeft when offset is O", () => {
    expect(marginStart(true, 0, 300, 0)).toBe(150);
  });
  it("Should calculate the right marginBottom and marginRight when offset is O", () => {
    expect(marginEnd(true, 20, 20, 300, 0)).toBe(150);
  });
  it("Should return the margin entered manually", () => {
    expect(marginEnd(true, 20, 20, 300, 0, 45)).toBe(45);
  });
  it("Should calculate the right marginTop and marginLeft when offset is 45", () => {
    expect(marginStart(true, 0, 300, 45)).toBe(195);
  });
  it("Should calculate the right marginBottom and marginRight when offset is 45", () => {
    expect(marginEnd(true, 20, 20, 300, 45)).toBe(105);
  });
});
