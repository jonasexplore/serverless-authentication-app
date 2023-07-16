import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ValidateToken } from '@/application/use-cases';
import { handlerExceptions, handlerResponse } from '@/common/http';
import { ERRORS_MESSAGE, HTTP_STATUS } from '@/common/utils/enums';
import { CognitoProvider } from '@/infra/providers/cognito';

const authProvider = new CognitoProvider();
const validateToken = new ValidateToken(authProvider);

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
    const idToken = tokens.splice(3, 3).join('.');
    const accessToken = tokens.join('.');

    const response = await validateToken.handler({
      accessToken,
      idToken,
    });

    return handlerResponse({
      status: HTTP_STATUS.ok,
      data: response,
    });
  } catch (error) {
    return handlerExceptions(error);
  }
};
