import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export default function apiRootAnonymus(tokenCache?: TokenCache) {
  const projectKey: string = process.env.CTP_PROJECT_KEY || '';

  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
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
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
}
