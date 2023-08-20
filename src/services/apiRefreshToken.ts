import { ClientBuilder, type RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey: string = process.env.CTP_PROJECT_KEY || '';

export default function apiRefreshToken(refreshToken: string) {
  const options: RefreshAuthMiddlewareOptions = {
    host: process.env.CTP_AUTH_URL || '',
    projectKey,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID || '',
      clientSecret: process.env.CTP_CLIENT_SECRET || '',
    },
    refreshToken,
    fetch,
  };

  const ctpClient = new ClientBuilder().withProjectKey(projectKey).withRefreshTokenFlow(options).build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
}
