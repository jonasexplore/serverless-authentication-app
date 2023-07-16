import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { RefreshToken } from '@/application/use-cases';
import { handlerExceptions, handlerResponse } from '@/common/http';
import { ERRORS_MESSAGE, HTTP_STATUS } from '@/common/utils/enums';
import { CognitoProvider } from '@/infra/providers/cognito';

const authProvider = new CognitoProvider();
const refreshToken = new RefreshToken(authProvider);

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.headers) {
      return handlerResponse({
        status: HTTP_STATUS.badResquest,
        error: ERRORS_MESSAGE.generic,
      });
    }

    const { authorization } = event.headers;
    const tokens = authorization.split('.');
    const refreshTokenHeader = tokens.splice(3, 5).join('.');
    const accessToken = tokens.join('.');

    const response = await refreshToken.handler({
      accessToken,
      refreshToken: refreshTokenHeader,
    });

    return handlerResponse({
      status: HTTP_STATUS.ok,
      data: response,
    });
  } catch (error) {
    return handlerExceptions(error);
  }
};
