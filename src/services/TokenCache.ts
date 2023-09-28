import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class MyTokenCache implements TokenCache {
  private token: TokenStore;

  constructor() {
    this.token = {
      token: '',
      refreshToken: '',
      expirationTime: 0,
    };
  }

  set(newToken: TokenStore) {
    this.token = newToken;
  }

  get() {
    return this.token;
  }
}
