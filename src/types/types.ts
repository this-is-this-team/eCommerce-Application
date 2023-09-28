import { AppRoutesPath } from '../router/types';

interface IMenuLinks {
  title: string;
  href: AppRoutesPath | string;
}

interface IMenuItems extends IMenuLinks {
  innerItems?: IMenuLinks[];
}

type ListDataType = { [key: string]: string };

export { IMenuItems, ListDataType };

export interface ICategory {
  label: string;
  url: string;
  slug: string;
}
