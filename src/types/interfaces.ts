import { BaseAddress } from '@commercetools/platform-sdk';
import InputField from '../components/input/input';
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

export interface IDetailsData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export interface IDetailsPasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface IBreadcrumbLink {
  pageName: string;
  pageHref: AppRoutesPath | string;
}

export interface IBannerContent {
  title: string;
  text: string;
}

export interface InputFilds {
  [inputName: string]: InputField;
}

export interface IAddressData {
  address: BaseAddress;
  billingAddressIds: string[] | undefined;
  shippingAddressIds: string[] | undefined;
  defaultBillingAddressId: string | undefined;
  defaultShippingAddressId: string | undefined;
}

export interface IAddressFormData {
  type: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IAboutUsMember {
  name: string;
  role: string;
  imgClass: string;
  about: string;
  contributions: string[];
  link: string;
}

export interface IPromoCodes {
  title: string;
  descr: string;
  code: string;
  expirationDate: string;
}
