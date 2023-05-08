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
    if (finalData.username) {
      finalData.username = await this.formatUsername(finalData.username);
    }
    if (finalData.password) {
      finalData.password = await this.cryptoService.hash(finalData.password);
    }
    const user = this.userRepo.create(finalData);
    return await this.userRepo.save(user);
  }

  public async update(username: string, data: Partial<User>): Promise<void> {
    await this.userRepo.update({ username }, data);
  }

  public async formatUsername(username: string): Promise<string> {
    let formattedUsername = username.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16).toLowerCase();
    let i = 0;
    while (await this.exists(formattedUsername)) {
      formattedUsername = `${formattedUsername.substring(0, 16 - i.toString().length)}${i}`;
      i++;
    }
    return formattedUsername;
  }

  public async exists(username: string): Promise<boolean> {
    return await this.userRepo.exist({ where: { username } });
  }
}
