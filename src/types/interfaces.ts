import { AppRoutesPath } from '../router/types';

export interface IAddress {
  key: string;
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
}

export interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: IAddress[];
  shippingAddresses?: number[];
  billingAddresses?: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface ISigninData {
  email: string;
  password: string;
}

export interface IBreadcrumbLink {
  pageName: string;
  pageHref: AppRoutesPath;
}

export interface IBannerContent {
  title: string;
  text: string;
}
