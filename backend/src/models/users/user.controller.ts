import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, FindByUsernameParams } from './dto/user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
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
  public async create(@Body() dto: CreateUserDTO) {
    return await this.userService.create(dto);
  }
}
