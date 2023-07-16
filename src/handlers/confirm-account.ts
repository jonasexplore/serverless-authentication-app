import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { ConfirmAccount } from '@/application/use-cases';
import { handlerExceptions, handlerResponse } from '@/common/http';
import { ERRORS_MESSAGE, HTTP_STATUS } from '@/common/utils/enums';
import { CognitoProvider } from '@/infra/providers/cognito';

const authProvider = new CognitoProvider();
const confirmAccount = new ConfirmAccount(authProvider);

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.queryStringParameters || !event.body) {
      return handlerResponse({
        status: HTTP_STATUS.badResquest,
        error: ERRORS_MESSAGE.generic,
      });
    }

    const { email } = event.queryStringParameters;
    const { confirmationCode } = JSON.parse(event.body);

    await confirmAccount.handler({ email, confirmationCode });

    return handlerResponse({
      status: HTTP_STATUS.ok,
    });
  } catch (error) {
    return handlerExceptions(error);
  }
};
