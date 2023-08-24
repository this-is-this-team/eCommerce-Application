import userStore from '../store/user-store';

export default function userLogout() {
  localStorage.removeItem('token');
  userStore.dispatch({ type: 'SET_IS_AUTH', isAuth: false });
  userStore.dispatch({ type: 'REMOVE_CUSTOMER' });
}
