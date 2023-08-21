import { AppRoutesPath } from '../router/types';
import userStore from '../store/user-store';

export default function routerMiddleware(path: AppRoutesPath): boolean {
  const isToken: string = userStore.getState().token;
  const isAuthPath: boolean = path === AppRoutesPath.LOGIN || path === AppRoutesPath.SIGN_UP;

  return !!isToken && isAuthPath;
}
