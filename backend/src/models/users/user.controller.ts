import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { ResolveUserPipe } from '../../common/pipes/resolve-user.pipe';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { AbilityFactory } from '../../casl/ability.factory';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { Action } from '../../casl/action.enum';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UsePipes(ValidationPipe)
export class UserController {

  private readonly userService: UserService;
  private readonly abilityFactory: AbilityFactory;

  public constructor(userService: UserService, abilityFactory: AbilityFactory) {
    this.userService = userService;
    this.abilityFactory = abilityFactory;
  }

  @Get()
  public async findAll() {
    return await this.userService.findAll();
  }

  @Get(':username')
  public findByUsername(@Param('username', ResolveUserPipe) user: User) {
    return user;
  }

  @Post()
  public async create(@Body() dto: CreateUserDTO) {
    return await this.userService.create(dto);
  }

  @Patch(':username')
  @UseGuards(JwtAuthGuard)
  public async update(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User, @Body() dto: UpdateUserDTO) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.UPDATE, user)) {
      throw new UnauthorizedException('You can\'t update this user');
    }
    return await this.userService.update(user, dto);
  }
}
