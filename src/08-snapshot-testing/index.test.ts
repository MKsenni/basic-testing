// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const mockArr = [1, 2, 3, 4];
const mockLinkedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};

const mockNullLinckedList = { value: null, next: null };

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(mockArr)).toStrictEqual(mockLinkedList);
    expect(generateLinkedList([])).toStrictEqual(mockNullLinckedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(mockArr)).toMatchSnapshot(mockLinkedList);
    expect(generateLinkedList([])).toMatchSnapshot(mockNullLinckedList);
  });
});
