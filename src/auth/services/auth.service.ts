import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';
import { User } from '../../database/entities/users/user.entity';
import { PayloadToken } from './../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByMail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }

    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
        access_token: this.jwtService.sign(payload),
        user,
    };
  }
}
