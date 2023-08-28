import { AppRoute, AppRoutesPath } from './types';

import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import SignupPage from '../pages/signup-page/signup-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import CatalogPage from '../pages/catalog-page/catalog-page';

export const MAIN_ROUTE: AppRoute = {
  path: AppRoutesPath.MAIN,
  component: () => new MainPage().getElement(),
};

export const NOT_FOUND_ROUTE: AppRoute = {
  path: AppRoutesPath.NOT_FOUND,
  component: () => new NotFoundPage().getElement(),
};

export const ROUTES: AppRoute[] = [
  MAIN_ROUTE,
  {
    path: AppRoutesPath.LOGIN,
    component: () => new LoginPage().getElement(),
  },
  {
    path: AppRoutesPath.SIGN_UP,
    component: () => new SignupPage().getElement(),
  },
  {
    path: AppRoutesPath.SHOP,
    component: () => new CatalogPage().getElement(),
  },
  NOT_FOUND_ROUTE,
];
