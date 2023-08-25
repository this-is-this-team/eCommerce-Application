import { AppRoutesPath } from '../router/types';
import userStore from '../store/user-store';

export default function routerMiddleware(path: AppRoutesPath): boolean {
  const { isAuth } = userStore.getState();
  const isAuthPath: boolean = path === AppRoutesPath.LOGIN || path === AppRoutesPath.SIGN_UP;

  return !!isAuth && isAuthPath;
}
