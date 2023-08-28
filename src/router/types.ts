export interface AppRoute {
  path: AppRoutesPath;
  component: () => HTMLElement;
}

export const enum AppRoutesPath {
  MAIN = '/',
  LOGIN = '/login',
  SIGN_UP = '/registration',
  SHOP = '/shop',
  CATEGORY = '/shop/category',
  PRODUCT = '/shop/category/:id',
  NOT_FOUND = '/404',
  ANCHOR = '#',
}
