import { Entity } from '@/common/entities';

import AccountValidatorFactory from '../validator';

export type AccountProps = {
  email: string;
  password: string;
};

export class Account extends Entity<AccountProps> {
  constructor(public readonly props: AccountProps) {
    Account.validate(props);

    super(props);
  }

  static validate(props: AccountProps) {
    const validator = AccountValidatorFactory.create();
    const isValid = validator.validate(props);

    if (!isValid) {
      throw new Error('Error to validate entity');
    }
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }
}
