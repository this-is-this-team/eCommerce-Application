import { AppRoutesPath } from '../router/types';

export interface IAddress {
  key: string;
  country: string;
  street: string;
  city: string;
  postcode: string;
}

export interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  addresses: IAddress[];
}

export interface ISigninData {
  email: string;
  password: string;
}

export interface IBreadcrumbLink {
  pageName: string;
  pageHref?: AppRoutesPath;
}

export interface IBannerContent {
  title: string;
  text: string;
}
