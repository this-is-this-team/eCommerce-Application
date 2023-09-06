export interface AppRoute {
  path: AppRoutesPath;
  component: () => HTMLElement;
}

export enum AppRoutesPath {
  MAIN = '/',
  LOGIN = '/login',
  SIGN_UP = '/registration',
  ACCOUNT = '/account',
  ACCOUNT_ADDRESSES = '/account/addresses',
  SHOP = '/shop',
  CATEGORY = '/shop/:category',
  SUBCATEGORY = '/shop/:category/:subcategory',
  PRODUCT = '/shop/:category/:subcategory/:id',
  BASKET = '/basket',
  ABOUT_US = '/about-us',
  NOT_FOUND = '/404',
  ANCHOR = '#',
}

export enum MiddlewareTypes {
  AUTH = 'auth',
  ACCOUNT = 'account',
}
