/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteUserByEmail(email: string): Promise<void> {
  await prisma.user.deleteMany({
    where: { email },
  });
}
const email = 'test@example.com';
describe('Auth Flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await deleteUserByEmail(email);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const user = {
    email: email,
    password: '123456',
  };

  let token: string;

  it('🆕 should register a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('✌️ should login the user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('access_token');
        token = res.body.access_token;
      });
  });

  it('👍 should get the user profile', () => {
    return request(app.getHttpServer())
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('username', user.email);
      });
  });
});
