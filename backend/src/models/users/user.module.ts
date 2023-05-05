import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { CryptoModule } from '../../crypto/crypto.module';
import { MeController } from './me.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CryptoModule],
  providers: [UserService, UserRepository],
  controllers: [UserController, MeController],
  exports: [UserService]
})
export class UserModule {}
