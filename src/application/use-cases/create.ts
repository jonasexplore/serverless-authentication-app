import { UseCase } from '@/common/use-cases/use-case';
import { Account, AccountProps } from '@/domain/entity';
import { AuthProviderInterface } from '@/infra/providers';

export class CreateAccount implements UseCase {
  constructor(public authProvider: AuthProviderInterface) {
    this.authProvider = authProvider;
  }

  async handler(payload: AccountProps) {
    const account = new Account(payload);
    await this.authProvider.createUser(account);
  }
}
