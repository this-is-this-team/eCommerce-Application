export interface AppRoute {
  path: AppRoutesPath;
  component: HTMLElement;
}

export const enum AppRoutesPath {
  MAIN = '/',
  LOGIN = '/login',
  SIGN_UP = '/registration',
  NOT_FOUND = '/404',
  ANCHOR = '#',
}
