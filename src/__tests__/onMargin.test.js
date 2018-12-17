import { marginStart, marginEnd } from "../functions/onMargin";

describe("Margin calculations", () => {
  it("Should calculate the right marginTop and marginLeft when offset is O", () => {
    expect(marginStart(true, 0, 300, 20, 0)).toBe(130);
  });
  it("Should calculate the right marginBottom and marginRight when offset is O", () => {
    expect(marginEnd(true, 20, 20, 300, 20, 0)).toBe(130);
  });
  it("Should calculate the right marginTop and marginLeft when offset is 45", () => {
    expect(marginStart(true, 0, 300, 20, 45)).toBe(175);
  });
  it("Should calculate the right marginBottom and marginRight when offset is 45", () => {
    expect(marginEnd(true, 20, 20, 300, 20, 45)).toBe(85);
  });
});
