interface IMenuLinks {
  title: string;
  href: string;
}

interface IMenuItems extends IMenuLinks {
  innerItems?: IMenuLinks[];
}

export { IMenuItems };
