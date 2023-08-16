import { AppRoute, AppRoutesPath } from './types';

import MainPage from '../pages/main-page/main-page';
import SignupPage from '../pages/signup-page/signup-page';
import NotFoundPage from '../pages/not-found/not-found';

export const NOT_FOUND_COMPONENT: AppRoute = {
  path: AppRoutesPath.NOT_FOUND,
  component: new NotFoundPage().getElement(),
};

export const ROUTES: AppRoute[] = [
  {
    path: AppRoutesPath.MAIN,
    component: new MainPage().getElement(),
  },
  {
    path: AppRoutesPath.SIGN_UP,
    component: new SignupPage().getElement(),
  },
  NOT_FOUND_COMPONENT,
];
