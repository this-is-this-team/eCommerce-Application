import { AppRoutesPath } from '../router/types';

interface IMenuLinks {
  title: string;
  href: AppRoutesPath;
}

interface IMenuItems extends IMenuLinks {
  innerItems?: IMenuLinks[];
}

export { IMenuItems };
