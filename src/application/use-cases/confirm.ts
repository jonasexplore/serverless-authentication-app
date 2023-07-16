import { UseCase } from '@/common/use-cases/use-case';
import { AuthProviderInterface } from '@/infra/providers';

type ConfirmAccountProps = {
  confirmationCode: string;
  email: string;
};

export class ConfirmAccount implements UseCase {
  constructor(public authProvider: AuthProviderInterface) {
    this.authProvider = authProvider;
  }

  async handler({ confirmationCode, email }: ConfirmAccountProps) {
    if (!email) {
      throw new Error('Email is required');
    }

    if (!confirmationCode) {
      throw new Error('Confirmation code is required');
    }

    return this.authProvider.accountConfirmation({
      confirmationCode,
      email,
    });
  }
}
