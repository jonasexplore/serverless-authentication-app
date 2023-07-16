import { UseCase } from '@/common/use-cases/use-case';
import { Account, AccountProps } from '@/domain/entity';
import { AuthProviderInterface } from '@/infra/providers';

export class AuthenticateAccount implements UseCase {
  constructor(public authProvider: AuthProviderInterface) {
    this.authProvider = authProvider;
  }

  async handler(props: AccountProps) {
    const account = new Account(props);
    return this.authProvider.authenticate(account);
  }
}
