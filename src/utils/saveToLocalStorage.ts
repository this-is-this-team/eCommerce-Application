export default function saveToLocalStorage(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}
