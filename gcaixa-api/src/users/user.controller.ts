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

    @Put()
    @UseGuards(JwtAuthGuard)
    public update(@Body() user: User) {
        return this.service.update(user);
    }
}