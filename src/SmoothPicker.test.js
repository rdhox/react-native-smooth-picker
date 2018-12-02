import { SelectionItem, marginStart, marginEnd } from "./logic";

const mockParentRef = {
  measureInWindow: jest.fn(cb => cb(20, 20, 600, 600))
};

describe("operation", () => {
  it("It should not test every item at each scroll event, only 20 items around the one selected", () => {
    const fnReturn = jest.fn();
    const onSelected = jest.fn();
    const mockFn = jest.fn(cb => cb(20, 20, 20, 20));
    const mockTab = Array.from({ length: 50 }, (_, i) => [
      { measureInWindow: mockFn },
      i,
      i
    ]);
    SelectionItem(true, mockParentRef, 10, mockTab, onSelected, 5, 0, fnReturn);
    expect(mockFn).toHaveBeenCalledTimes(20);
  });
  it("HORIZONTAL - Items should be selected only if they are between the two deltas and the onSelected props function should be triggered", () => {
    const fnReturn = jest.fn(index => index);
    const onSelected = jest.fn();
    const mockTab = Array.from({ length: 15 }, (_, i) => [
      { measureInWindow: jest.fn(cb => cb(i * 40 + 20, 20, 40, 20)) },
      i,
      i
    ]);
    SelectionItem(true, mockParentRef, 3, mockTab, onSelected, 15, 0, fnReturn);
    expect(fnReturn.mock.results[0].value).toBe(7);
    expect(onSelected).toHaveBeenCalledTimes(1);
  });

  it("VERTICAL - Items should be selected only if they are between the two deltas and the onSelected props function should be triggered", () => {
    const fnReturn = jest.fn(index => index);
    const onSelected = jest.fn();
    const mockTab = Array.from({ length: 15 }, (_, i) => [
      { measureInWindow: jest.fn(cb => cb(20, i * 40 + 20, 20, 40)) },
      i,
      i
    ]);
    SelectionItem(
      false,
      mockParentRef,
      3,
      mockTab,
      onSelected,
      15,
      0,
      fnReturn
    );
    expect(fnReturn.mock.results[0].value).toBe(7);
    expect(onSelected).toHaveBeenCalledTimes(1);
  });
});

describe("interaction", () => {
  it(" HORIZONTAL - It should select value where offset is decided by user", () => {
    const fnReturn = jest.fn(index => index);
    const onSelected = jest.fn();
    const mockTab = Array.from({ length: 15 }, (_, i) => [
      { measureInWindow: jest.fn(cb => cb(i * 40 + 20, 20, 40, 20)) },
      i,
      i
    ]);
    SelectionItem(
      true,
      mockParentRef,
      3,
      mockTab,
      onSelected,
      15,
      -80,
      fnReturn
    );
    expect(fnReturn.mock.results[0].value).toBe(5);
  });
  it(" VERTICAL - It should select value where offset is decided by user", () => {
    const fnReturn = jest.fn(index => index);
    const onSelected = jest.fn();
    const mockTab = Array.from({ length: 15 }, (_, i) => [
      { measureInWindow: jest.fn(cb => cb(20, i * 40 + 20, 20, 40)) },
      i,
      i
    ]);
    SelectionItem(
      false,
      mockParentRef,
      3,
      mockTab,
      onSelected,
      15,
      -80,
      fnReturn
    );
    expect(fnReturn.mock.results[0].value).toBe(5);
  });
});

// describe("render", () => {
//   it("It should change the style of selected element when selected");
// });

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
