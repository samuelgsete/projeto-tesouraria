import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/user.service';
import { User } from 'src/shared/models/user.entity';
import { UserNotFoundException } from 'src/shared/exceptions/modelos/user-not-found.exception';

@Injectable()
export class AuthService {

  public user = new User();

  constructor (
                private usersService: UserService,
                private jwtService: JwtService
              ) 
  { }

  public  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if(!user) {
      throw new UserNotFoundException('Usuario inexistente');
    }

    if (user && user.password === pass) {
      this.user = user;
      return user;
    }
    return null;
  }

  public async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      name_user: user.name,
      user_id: user.id
    };
  }
}