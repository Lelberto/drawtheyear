import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { User } from '../../models/users/entities/user.entity';
import { UserService } from '../../models/users/user.service';

@Injectable()
export class ResolveUserPipe implements PipeTransform<string, Promise<User>> {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async transform(value: string, metadata: ArgumentMetadata): Promise<User> {
    const user = await this.userService.findByUsername(value);
    if (!user) {
      throw new NotFoundException(`User "${value}" not found`);
    }
    return user;
  }
}
