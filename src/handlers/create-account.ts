import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CreateAccount } from '@/application/use-cases';
import { handlerExceptions, handlerResponse } from '@/common/http';
import { HTTP_STATUS } from '@/common/utils/enums';
import { CognitoProvider } from '@/infra/providers/cognito';

const authProvider = new CognitoProvider();
const createAccount = new CreateAccount(authProvider);

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return handlerResponse({
        status: HTTP_STATUS.badResquest,
        error: 'The body is required',
      });
    }

    const data = JSON.parse(event.body);

    await createAccount.handler(data);

    return handlerResponse({
      status: HTTP_STATUS.created,
    });
  } catch (error) {
    return handlerExceptions(error);
  }
};
