import { Injectable } from '@nestjs/common';
import { CryptoService } from '../../crypto/crypto.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

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

  public async findByUsername(username: string): Promise<User> {
    return await this.userRepo.findOneBy({ username });
  }

  public async create(data: Partial<User>): Promise<User> {
    const finalData = { ...data };
    if (finalData.password) {
      finalData.password = await this.cryptoService.hash(finalData.password);
    }
    const user = this.userRepo.create(finalData);
    return await this.userRepo.save(user);
  }
}
