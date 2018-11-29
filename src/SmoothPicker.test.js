import { isSelected } from "./logic";

const mockParentRef = {
  measureInWindow: jest.fn(cb => cb(20, 20, 600, 50))
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
    isSelected(mockParentRef, 10, mockTab, onSelected, 5, 0, fnReturn);

    expect(mockFn).toHaveBeenCalledTimes(20);
  });

  it("Items should be selected only if they are in the right position between the two deltas and the onSelected props function should be triggered", () => {
    const fnReturn = jest.fn(index => index);
    const onSelected = jest.fn();
    const mockTab = Array.from({ length: 15 }, (_, i) => [
      { measureInWindow: jest.fn(cb => cb(i * 40 + 20, 20, 40, 20)) },
      i,
      i
    ]);
    isSelected(mockParentRef, 3, mockTab, onSelected, 15, 0, fnReturn);

    expect(fnReturn.mock.results[0].value).toBe(7);
    expect(onSelected).toHaveBeenCalledTimes(1);
  });
});

describe("interaction", () => {
  it("It should select value where offset is decided by user", () => {
    const fnReturn = jest.fn(index => index);
    const onSelected = jest.fn();
    const mockTab = Array.from({ length: 15 }, (_, i) => [
      { measureInWindow: jest.fn(cb => cb(i * 40 + 20, 20, 40, 20)) },
      i,
      i
    ]);
    isSelected(mockParentRef, 3, mockTab, onSelected, 15, -80, fnReturn);

    expect(fnReturn.mock.results[0].value).toBe(5);
  });
  // it("It should have an magnet props that influence the selection");
});

// describe("render", () => {
//   it("It should change the style of selected element when selected");
// });
