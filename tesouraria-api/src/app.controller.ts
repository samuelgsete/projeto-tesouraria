import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

import { AuthService } from './auth/auth.service';

@Controller()
@UseGuards(LocalAuthGuard)
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }
}