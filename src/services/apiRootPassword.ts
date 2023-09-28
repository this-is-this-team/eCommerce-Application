import {
  ClientBuilder,
  TokenCache,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey: string = process.env.CTP_PROJECT_KEY || '';

export default function apiRootPassword(email: string, password: string, tokenCache: TokenCache) {
  const options: PasswordAuthMiddlewareOptions = {
    host: process.env.CTP_AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID || '',
      clientSecret: process.env.CTP_CLIENT_SECRET || '',
      user: {
        username: email,
        password,
      },
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
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
}
