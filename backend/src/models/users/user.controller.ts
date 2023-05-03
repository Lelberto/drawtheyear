import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  public async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  public async create(@Body() dto: any) {
    return await this.userService.create(dto);
  }
}
