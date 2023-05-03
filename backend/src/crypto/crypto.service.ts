import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {

  public async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  public async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
