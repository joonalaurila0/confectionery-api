import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) loginDto: LoginDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginDto);
  }
}
