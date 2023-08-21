import userStore from '../store/user-store';

export default function saveToken(token: string) {
  localStorage.setItem('token', JSON.stringify(token));

  userStore.dispatch({ type: 'ADD_TOKEN', token });
}
