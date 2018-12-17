import onSelect from "../functions/onSelect";

describe("operation", () => {
  it("HORIZONTAL - It should select value where scroll offset is on a item", () => {
    const nativeEvent = {
      contentOffset: {
        x: 600
      }
    };
    const options = Array.from({ length: 15 }, (_, i) => ({
      left: i * 70,
      right: i * 70 + 70,
      item: {},
      index: i
    }));
    const selected = 7;
    const scrollPosition = 599;
    const fnMock = jest.fn((item, index, cursor) => index);
    const horizontal = true;
    onSelect(
      nativeEvent,
      selected,
      options,
      fnMock,
      scrollPosition,
      horizontal
    );
    expect(fnMock).toHaveBeenCalledTimes(1);
    expect(fnMock.mock.results[0].value).toBe(8);
  });
  it("VERTICAL - It should select value where scroll offset is on a item", () => {
    const nativeEvent = {
      contentOffset: {
        y: 300
      }
    };
    const options = Array.from({ length: 15 }, (_, i) => ({
      top: i * 70,
      bottom: i * 70 + 70,
      item: {},
      index: i
    }));
    const selected = 3;
    const scrollPosition = 299;
    const fnMock = jest.fn((item, index, cursor) => index);
    const horizontal = false;
    onSelect(
      nativeEvent,
      selected,
      options,
      fnMock,
      scrollPosition,
      horizontal
    );
    expect(fnMock).toHaveBeenCalledTimes(1);
    expect(fnMock.mock.results[0].value).toBe(4);
  });
});
