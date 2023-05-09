import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UsernameParams } from '../../models/users/dto/user.dto';
import { User } from '../../models/users/entities/user.entity';
import { UserService } from '../../models/users/user.service';

@Injectable()
export class ResolveUserPipe implements PipeTransform<UsernameParams, Promise<User>> {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(value: UsernameParams, metadata: ArgumentMetadata): Promise<User> {
    const user = await this.userService.findByUsername(value.username);
    if (!user) {
      throw new NotFoundException(`User "${value.username}" not found`);
    }
    return user;
  }
}
