import { Controller, Post, Body, Put, Get, Param } from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "src/shared/models/user.entity";

@Controller('user')
export class UserController {

    public constructor(private service: UserService) {}

    @Get(':id')
    public findById(@Param('id') id: number): Promise<User> {
        return this.service.findById(id);
    }

    @Post()
    public create(@Body() user: User) {
        return this.service.save(user);
    }

    @Put()
    public update(@Body() user: User) {
        return this.service.update(user);
    }
}