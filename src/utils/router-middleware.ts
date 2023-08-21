import { AppRoutesPath } from '../router/types';
import userStore from '../store/user-store';

export default function routerMiddleware(path: AppRoutesPath): boolean {
  const isToken: string = userStore.getState().token;
  // TODO: add (|| path === AppRoutesPath.SIGN_UP) in redirect register page issue
  const isAuthPath: boolean = path === AppRoutesPath.LOGIN;

  return !!isToken && isAuthPath;
}
