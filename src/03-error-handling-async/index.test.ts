// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    return expect(resolveValue('right')).resolves.toBe('right');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    return expect(() => throwError('Error')).toThrow('Error');
  });

  test('should throw error with default message if message is not provided', () => {
    return expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    return expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
