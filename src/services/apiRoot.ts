import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export default function apiRoot(tokenCache: TokenCache) {
  const projectKey: string = process.env.CTP_PROJECT_KEY || '';

  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: process.env.CTP_AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID || '',
      clientSecret: process.env.CTP_CLIENT_SECRET || '',
    },
    scopes: [process.env.CTP_SCOPES || ''],
    tokenCache,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: process.env.CTP_API_URL || '',
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
}
