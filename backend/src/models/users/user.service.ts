import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { CryptoService } from '../../crypto/crypto.service';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {

  private readonly userRepo: UserRepository;
  private readonly cryptoService: CryptoService;

  public constructor(userRepo: UserRepository, cryptoService: CryptoService) {
    this.userRepo = userRepo;
    this.cryptoService = cryptoService;
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  public async findById(id: number): Promise<User> {
    return await this.userRepo.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email });
  }

  public async create(dto: CreateUserDTO): Promise<User> {
    const data = { ...dto };
    if (data.password) {
      data.password = await this.cryptoService.hash(data.password);
    }
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }
}
