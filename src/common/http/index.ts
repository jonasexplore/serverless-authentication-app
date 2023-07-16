import type { APIGatewayProxyResult } from 'aws-lambda';

import { logger } from '../loggers';
import { ERRORS_MESSAGE, HTTP_STATUS } from '../utils/enums';

type HandlerResponseProps = {
  status: HTTP_STATUS;
  error?: string;
  data?: any;
};

export const handlerResponse = ({
  status,
  error,
  data,
}: HandlerResponseProps): APIGatewayProxyResult => {
  const hasError = Boolean(error);

  return {
    statusCode: status,
    body: JSON.stringify({
      hasError,
      status,
      error: hasError ? { message: error } : undefined,
      data: hasError ? undefined : data,
    }),
  };
};

export const handlerExceptions = (error: unknown): APIGatewayProxyResult => {
  if (error instanceof Error) {
    logger.error(error.message);

    return handlerResponse({
      status: HTTP_STATUS.badResquest,
      error: ERRORS_MESSAGE.generic,
    });
  }

  return handlerResponse({
    status: HTTP_STATUS.internalServerError,
    error: 'Internal Server Error',
  });
};
