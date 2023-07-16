export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      AWS_REGION: string;
      AWS_COGNITO_CLIENT_ID: string;
      AWS_COGNITO_USER_POOL_ID: string;
    }
  }
}
