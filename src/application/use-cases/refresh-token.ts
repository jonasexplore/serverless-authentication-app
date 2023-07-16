import { UseCase } from '@/common/use-cases/use-case';
import { AuthProviderInterface } from '@/infra/providers';

type RefreshTokenProps = {
  accessToken: string;
  refreshToken: string;
};

export class RefreshToken implements UseCase {
  constructor(public authProvider: AuthProviderInterface) {
    this.authProvider = authProvider;
  }

  async handler({ accessToken, refreshToken }: RefreshTokenProps) {
    return this.authProvider.refreshToken(accessToken, refreshToken);
  }
}
