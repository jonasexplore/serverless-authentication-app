import { UseCase } from '@/common/use-cases/use-case';
import { AuthProviderInterface } from '@/infra/providers';

type ValidateTokenProps = {
  accessToken: string;
  idToken: string;
};

export class ValidateToken implements UseCase {
  constructor(public authProvider: AuthProviderInterface) {
    this.authProvider = authProvider;
  }

  async handler(props: ValidateTokenProps) {
    return this.authProvider.validateToken(props);
  }
}
