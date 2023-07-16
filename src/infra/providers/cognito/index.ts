import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import { ERRORS_MESSAGE } from '@/common/utils/enums';
import { Account } from '@/domain/entity';

import {
  AuthProviderInterface,
  ConfirmationAccountProps,
  ValidateTokenProps,
} from '..';

const POOL_DATA = {
  ClientId: process.env.AWS_COGNITO_CLIENT_ID,
  UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
};

export class CognitoProvider implements AuthProviderInterface {
  private userPool: CognitoUserPool;
  constructor() {
    this.userPool = new CognitoUserPool(POOL_DATA);
  }

  async createUser({ email, password }: Account): Promise<any> {
    return new Promise((resolve, reject) => {
      const attributeEmail = new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      });

      const attributeList = [];
      attributeList.push(attributeEmail);

      this.userPool.signUp(
        email,
        password,
        attributeList,
        null,
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve({ user: result.user });
        },
      );
    });
  }

  async accountConfirmation({
    confirmationCode,
    email,
  }: ConfirmationAccountProps): Promise<any> {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: this.userPool,
      };

      const user = new CognitoUser(userData);

      user.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  async authenticate({ email, password }: Account) {
    return new Promise((resolve, reject) => {
      const authenticationData = {
        Username: email,
        Password: password,
      };

      const authenticationDetails = new AuthenticationDetails(
        authenticationData,
      );

      const userData = {
        Username: email,
        Pool: this.userPool,
      };

      const user = new CognitoUser(userData);

      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          const idToken = result.getIdToken().getJwtToken();

          resolve({ accessToken, refreshToken, idToken });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async validateToken({
    accessToken,
    idToken,
  }: ValidateTokenProps): Promise<any> {
    return new Promise((resolve, reject) => {
      const cognitoAccessToken = new CognitoAccessToken({
        AccessToken: accessToken,
      });

      const cognitoIdToken = new CognitoIdToken({
        IdToken: idToken,
      });

      const userSession = new CognitoUserSession({
        AccessToken: cognitoAccessToken,
        IdToken: cognitoIdToken,
      });

      if (!userSession.isValid()) {
        reject(new Error(ERRORS_MESSAGE.expired_token));
      }

      resolve({
        valid: true,
      });
    });
  }

  async refreshToken(accessToken: string, refreshToken: string) {
    return new Promise((resolve, reject) => {
      const cognitoAccessToken = new CognitoAccessToken({
        AccessToken: accessToken,
      });

      const decoded = cognitoAccessToken.decodePayload();

      const userData = {
        Username: decoded.username,
        Pool: this.userPool,
      };

      const user = new CognitoUser(userData);

      const cognitoRefreshToken = new CognitoRefreshToken({
        RefreshToken: refreshToken,
      });

      user.refreshSession(cognitoRefreshToken, (err, result) => {
        if (err) {
          reject(err);
        }

        console.log(result);

        resolve(result);
      });
    });
  }
}
