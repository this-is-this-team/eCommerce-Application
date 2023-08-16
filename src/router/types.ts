export interface AppRoute {
  path: AppRoutesPath;
  component: HTMLElement;
}

export const enum AppRoutesPath {
  MAIN = '/',
  SIGN_UP = '/registration',
  NOT_FOUND = '/404',
}
