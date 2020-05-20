import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {

  public user: any = {}

  constructor (
                private usersService: UserService,
                private jwtService: JwtService
              ) 
  { }

  public  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      this.user = user;
      return user;
    }
    return null;
  }

  public async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      name_user: user.name
    };
  }
}