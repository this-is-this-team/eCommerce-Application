import { AppRoute, AppRoutesPath } from './types';

import MainPage from '../pages/main-page/main-page';
import LoginPage from '../pages/login-page/login-page';
import SignupPage from '../pages/signup-page/signup-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import CatalogPage from '../pages/catalog-page/catalog-page';
import ProductPage from '../pages/product-page/product-page';
import AccountPage from '../pages/account-page/account-page';
import AddressesPage from '../pages/addresses-page/addresses-page';
import BasketPage from '../pages/basket-page/basket-page';
import AboutUsPage from '../pages/about-us-page/about-us-page';

export const MAIN_ROUTE: AppRoute = {
  path: AppRoutesPath.MAIN,
  component: () => new MainPage().getElement(),
};

export const LOGIN_ROUTE: AppRoute = {
  path: AppRoutesPath.LOGIN,
  component: () => new LoginPage().getElement(),
};

export const NOT_FOUND_ROUTE: AppRoute = {
  path: AppRoutesPath.NOT_FOUND,
  component: () => new NotFoundPage().getElement(),
};

export const ROUTES: AppRoute[] = [
  MAIN_ROUTE,
  LOGIN_ROUTE,
  {
    path: AppRoutesPath.SIGN_UP,
    component: () => new SignupPage().getElement(),
  },
  {
    path: AppRoutesPath.ACCOUNT,
    component: () => new AccountPage().getElement(),
  },
  {
    path: AppRoutesPath.ACCOUNT_ADDRESSES,
    component: () => new AddressesPage().getElement(), // TODO: Change page-component when implemented
  },
  {
    path: AppRoutesPath.SHOP,
    component: () => new CatalogPage().getElement(),
  },
  {
    path: AppRoutesPath.CATEGORY,
    component: () => new CatalogPage().getElement(),
  },
  {
    path: AppRoutesPath.SUBCATEGORY,
    component: () => new CatalogPage().getElement(),
  },
  {
    path: AppRoutesPath.PRODUCT,
    component: () => new ProductPage().getElement(),
  },
  {
    path: AppRoutesPath.BASKET,
    component: () => new BasketPage().getElement(),
  },
  {
    path: AppRoutesPath.ABOUT_US,
    component: () => new AboutUsPage().getElement(),
  },
  NOT_FOUND_ROUTE,
];
