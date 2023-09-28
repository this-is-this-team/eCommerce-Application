import { AppRoutesPath } from '../router/types';
import userStore from '../store/user-store';

function authMiddleware(path: AppRoutesPath): boolean {
  const { isAuth } = userStore.getState();
  const isAuthPath: boolean = path === AppRoutesPath.LOGIN || path === AppRoutesPath.SIGN_UP;

  return isAuth && isAuthPath;
}

function accountMiddleware(path: AppRoutesPath): boolean {
  const { isAuth } = userStore.getState();
  const isAuthPath: boolean = path === AppRoutesPath.ACCOUNT || path === AppRoutesPath.ACCOUNT_ADDRESSES;

  return !isAuth && isAuthPath;
}

export { authMiddleware, accountMiddleware };
