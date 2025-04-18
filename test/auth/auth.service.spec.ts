import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: { user: any };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('🚧 should throw if user already exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1 });
      await expect(
        authService.register('existing@email.com', 'pass'),
      ).rejects.toThrow(BadRequestException);
    });

    it('🆕 should create a new user and return token', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPass');
      prisma.user.create.mockResolvedValue({ id: 1, email: 'new@email.com' });
      jwtService.sign.mockReturnValue('token');

      const result = await authService.register('new@email.com', 'pass');

      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('validateUser', () => {
    it('📂 should throw if user is not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await expect(
        authService.validateUser('test@email.com', 'pass'),
      ).rejects.toThrow(BadRequestException);
    });

    it('🚧 should throw if password does not match', async () => {
      prisma.user.findUnique.mockResolvedValue({
        email: 'test@email.com',
        password: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.validateUser('test@email.com', 'wrongpass'),
      ).rejects.toThrow(BadRequestException);
    });

    it('👤 should return user if credentials are valid', async () => {
      const user = { email: 'test@email.com', password: 'hashed' };
      prisma.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.validateUser('test@email.com', 'pass');
      expect(result).toEqual(user);
    });
  });

  describe('login', () => {
    it('🥳 should return a token', () => {
      jwtService.sign.mockReturnValue('token');

      const result = authService.login({ id: 1, email: 'a@email.com' });

      expect(result).toEqual({ access_token: 'token' });
    });
  });
});
