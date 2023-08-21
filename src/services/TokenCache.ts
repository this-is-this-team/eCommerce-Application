import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  private token: TokenStore | undefined;

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
