import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ClassValidatorFields } from '@/common/validators/class-validator-fields';

import { AccountProps } from '../entity';

export class AccountRules {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  constructor({ email, password }: AccountProps) {
    this.email = email;
    this.password = password;
  }
}

export class AccountValidator extends ClassValidatorFields<AccountRules> {
  validate(data: AccountRules): boolean {
    return super.validate(new AccountRules(data));
  }
}

export default class AccountValidatorFactory {
  static create() {
    return new AccountValidator();
  }
}
