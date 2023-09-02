import { AppRoutesPath } from '../router/types';

interface IMenuLinks {
  title: string;
  href: AppRoutesPath;
}

interface IMenuItems extends IMenuLinks {
  innerItems?: IMenuLinks[];
}

type ListDataType = { [key: string]: string };

export { IMenuItems, ListDataType };
