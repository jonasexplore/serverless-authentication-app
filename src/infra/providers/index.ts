import { Account } from '@/domain/entity';

export type ConfirmationAccountProps = {
  confirmationCode: string;
  email: string;
};

export type ValidateTokenProps = {
  accessToken: string;
  idToken: string;
};

export interface AuthProviderInterface {
  createUser(payload: Account): Promise<void>;
  accountConfirmation(props: ConfirmationAccountProps): Promise<void>;
  authenticate(props: Account): Promise<any>;
  validateToken(props: ValidateTokenProps): Promise<any>;
  refreshToken(accessToken: string, refreshToken: string): Promise<any>;
}
