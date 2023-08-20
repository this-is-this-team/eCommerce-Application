import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey: string = process.env.CTP_PROJECT_KEY || '';

export default function apiRootLogin(tokenCache: TokenCache) {
  const options: AnonymousAuthMiddlewareOptions = {
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
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
}
