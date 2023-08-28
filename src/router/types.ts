export interface AppRoute {
  path: AppRoutesPath;
  component: () => HTMLElement;
}

export const enum AppRoutesPath {
  MAIN = '/',
  LOGIN = '/login',
  SIGN_UP = '/registration',
  ACCOUNT = '/account',
  ACCOUNT_ADDRESSES = '/account/addresses',
  SHOP = '/shop',
  CATEGORY = '/shop/category',
  PRODUCT = '/shop/category/:id',
  NOT_FOUND = '/404',
  ANCHOR = '#',
}
