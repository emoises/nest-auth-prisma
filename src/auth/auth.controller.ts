import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Response } from 'express';
import { UserRequest } from 'src/types/user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const user = await this.authService.validateUser(body.email, body.password);
    const result = this.authService.login({ id: user.id, email: user.email });

    console.log('Sending cookie with token:', result.access_token);

    res.cookie('token', result.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req: UserRequest) {
    console.log('User from request:', req.user);
    return req.user;
  }

  @Post('register')
  async register(
    @Body() body: { email: string; password: string },
  ): Promise<AuthResponseDto> {
    return this.authService.register(body.email, body.password);
  }
}
