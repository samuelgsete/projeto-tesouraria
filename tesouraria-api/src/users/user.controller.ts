import { Controller, Post, Body, Put, Get, Param, UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "src/shared/models/user.entity";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('user')
export class UserController {

    public constructor(private service: UserService) {}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public findById(@Param('id') id: number): Promise<User> {
        return this.service.findById(id);
    }

    @Post()
    public create(@Body() user: User) {
        return this.service.save(user);
    }

    @Post(':code')
    public confirmUser(@Param('code') code: string) {
        return this.service.confirmUser(code);
    }

    @Put('resend')
    public resendCode(@Body() body: any) {
        return this.service.resendCode(body.email);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    public update(@Body() user: User) {
        return this.service.update(user);
    }

    @Put('recover/account')
    public recoverAccount(@Body() body: any) {
        return this.service.recoverAccount(body.email);
    }

    @Put('finalize/recover')
    public finalizeRecover(@Body() body: any) {
        return this.service.finalizeRecover(body.username, body.password, body.code);
    }
}