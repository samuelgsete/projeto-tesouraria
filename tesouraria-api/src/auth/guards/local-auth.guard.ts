import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Esse entidade é necessário para fazer login na API
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}