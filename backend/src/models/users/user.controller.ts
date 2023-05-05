import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { FindByUsernameParams } from './dto/user.dto';

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

  @Get(':username')
  public async findByUsername(@Param() params: FindByUsernameParams) {
    return await this.userService.findByUsername(params.username);
  }

  @Post()
  public async create(@Body() dto: any) {
    return await this.userService.create(dto);
  }
}
