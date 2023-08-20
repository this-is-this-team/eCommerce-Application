import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  token: TokenStore | undefined;

  constructor() {
    this.token = undefined;
  }

  set(newToken: TokenStore) {
    this.token = newToken;
  }

  get() {
    return this.token!;
  }
}
