export const createMockAuthService = () => ({
  login: jest.fn(),
  register: jest.fn(),
  validateUser: jest.fn(),
});
