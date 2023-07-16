export enum HTTP_STATUS {
  ok = 200,
  badResquest = 400,
  internalServerError = 500,
  created = 201,
}

export enum ERRORS_MESSAGE {
  generic = 'An error occurred',
  expired_token = 'Token has expired',
}
