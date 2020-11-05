import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/user.service';
import { User } from 'src/shared/models/user.entity';

@Injectable()
export class AuthService {

  public constructor (
                private userService: UserService,
                private jwtService: JwtService
              ) 
  { }

  public  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    if(!user) {
      throw new UnauthorizedException('Usuario não encontrado');
    }

    if (user && user.password === pass) {
      if(!user.isActive) {
        throw new UnauthorizedException('Usuario inativo');
      }
      return user;
    }
    return null;
  }

  public async login(user: User) {
    const payload = { username: user.username, name: user.name, user: true, userid: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}