import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { CryptoModule } from '../../crypto/crypto.module';
import { CASLModule } from '../../casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CryptoModule, CASLModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
