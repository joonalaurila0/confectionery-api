import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryExtended } from '../users/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User> & UserRepositoryExtended,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(loginDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

    return { accessToken };
  }
}
