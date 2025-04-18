import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { createMockAuthService } from '../mocks/auth.service.mock';
describe('AuthController', () => {
  let authController: AuthController;
  let authService: ReturnType<typeof createMockAuthService>;

  beforeEach(async () => {
    authService = {
      login: jest.fn(),
      register: jest.fn(),
      validateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('😁 should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('👋 should return a login response', async () => {
    const result = { access_token: 'any_token' };
    const body = { email: 'eduardo.moises@gmail.com', password: 'Edu270702' };

    authService.validateUser.mockResolvedValue({ id: 1, email: body.email });
    authService.login.mockResolvedValue(result);

    await expect(authController.login(body)).resolves.toEqual(result);
  });

  it('👤 should return user reference', () => {
    const request = {
      user: {
        id: '3',
        email: 'outro@email.com',
      },
    };

    const result = authController.getProfile(request);
    expect(result).toEqual(request.user);
  });

  it('🆕 should register a new user', async () => {
    const result = { access_token: 'any_token' };
    const body = { email: 'any@email.com', password: 'any_password' };

    authService.register.mockResolvedValue(result);

    await expect(authController.register(body)).resolves.toEqual(result);
  });
});
