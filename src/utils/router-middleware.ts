import { AppRoutesPath } from '../router/types';

export default function routerMiddleware(path: AppRoutesPath): boolean {
  const isToken: string | null = localStorage.getItem('token');
  // TODO: add (|| path === AppRoutesPath.SIGN_UP) in redirect register page issue
  const isAuthPath: boolean = path === AppRoutesPath.LOGIN;

  return !!isToken && isAuthPath;
}
