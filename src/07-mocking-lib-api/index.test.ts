// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const data = {
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false,
};

const baseURL = 'https://jsonplaceholder.typicode.com';
const relative_path = 'relative_path';

describe('throttledGetDataFromApi', () => {
  beforeEach(async () => {
    mockAxios.create.mockReturnThis();
    mockAxios.get.mockResolvedValue({ data });
    await throttledGetDataFromApi(baseURL);
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    expect(mockAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockAxios.get).toHaveBeenCalledWith(baseURL);
  });

  test('should return response data', async () => {
    await expect(throttledGetDataFromApi(relative_path)).resolves.toBe(data);
  });
});
