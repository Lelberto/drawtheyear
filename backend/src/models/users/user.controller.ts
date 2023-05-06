import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateParams, CreateUserDTO, FindByUsernameParams, UpdateUserDTO } from './dto/user.dto';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UsePipes(ValidationPipe)
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

  @Patch(':username')
  public async update(@Param() params: UpdateParams, @Body() dto: UpdateUserDTO) {
    await this.userService.update(params.username, dto);
  }
}
