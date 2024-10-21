// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const args = {
      a: 1,
      b: 2,
      action: Action.Add,
    };

    const result = simpleCalculator(args);
    expect(result).toEqual(3);
  });

  test('should subtract two numbers', () => {
    const args = {
      a: 4,
      b: 2,
      action: Action.Subtract,
    };

    const result = simpleCalculator(args);
    expect(result).toEqual(2);
  });

  test('should multiply two numbers', () => {
    const args = {
      a: 3,
      b: 2,
      action: Action.Multiply,
    };

    const result = simpleCalculator(args);
    expect(result).toEqual(6);
  });

  test('should divide two numbers', () => {
    const args = {
      a: 6,
      b: 2,
      action: Action.Divide,
    };

    const result = simpleCalculator(args);
    expect(result).toEqual(3);
  });

  test('should exponentiate two numbers', () => {
    const args = {
      a: 3,
      b: 2,
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(args);
    expect(result).toEqual(9);
  });

  test('should return null for invalid action', () => {
    const args = {
      a: 1,
      b: 2,
      action: '**',
    };

    const result = simpleCalculator(args);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const args = {
      a: 1,
      b: '2',
      action: Action.Exponentiate,
    };

    const result = simpleCalculator(args);
    expect(result).toBeNull();
  });
});
