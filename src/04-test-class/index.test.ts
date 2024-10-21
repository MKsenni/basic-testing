// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const initialBalance = 1000;
let account: BankAccount;
describe('BankAccount', () => {
  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(1100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const otherAccount = getBankAccount(500);
    expect(() => account.transfer(1100, otherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const deposit = 100;
    account.deposit(deposit);
    expect(account.getBalance()).toEqual(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    const withdrow = 100;
    account.withdraw(withdrow);
    expect(account.getBalance()).toEqual(initialBalance - withdrow);
  });

  test('should transfer money', () => {
    const transfer = 100;
    const initialBalanceOtherAccount = 500;
    const otherAccount = getBankAccount(initialBalanceOtherAccount);
    account.transfer(transfer, otherAccount);

    expect(otherAccount.getBalance()).toEqual(
      initialBalanceOtherAccount + transfer,
    );
    expect(account.getBalance()).toEqual(initialBalance - transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(500)
      .mockReturnValueOnce(1);

    const balanceFetch = await account.fetchBalance();
    expect(typeof balanceFetch).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(500);

    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    return expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
