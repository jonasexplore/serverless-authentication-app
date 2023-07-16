import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { AuthenticateAccount } from '@/application/use-cases';
import { handlerExceptions, handlerResponse } from '@/common/http';
import { ERRORS_MESSAGE, HTTP_STATUS } from '@/common/utils/enums';
import { CognitoProvider } from '@/infra/providers/cognito';

const authProvider = new CognitoProvider();
const authenticateAccount = new AuthenticateAccount(authProvider);

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return handlerResponse({
        status: HTTP_STATUS.badResquest,
        error: ERRORS_MESSAGE.generic,
      });
    }

    const { email, password } = JSON.parse(event.body);

    const response = await authenticateAccount.handler({ email, password });

    return handlerResponse({
      status: HTTP_STATUS.ok,
      data: response,
    });
  } catch (error) {
    return handlerExceptions(error);
  }
};
