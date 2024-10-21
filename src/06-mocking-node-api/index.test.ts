// Uncomment the code below and write your tests
import path, { join } from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');

const callback = jest.fn();
const time = 5000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, time);
    jest.advanceTimersByTime(time);
    expect(setTimeout).toHaveBeenCalledWith(callback, time);
  });
  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, time);
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, time);
    jest.advanceTimersByTime(time);
    expect(setInterval).toHaveBeenCalledWith(callback, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByTimeout(callback, time);
    jest.advanceTimersByTime(time * 3);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'some_path';
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue('the_content');

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe('the_content');
  });
});
