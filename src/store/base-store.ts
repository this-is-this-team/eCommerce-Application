export interface IStore<T, A> {
  getState: () => T;
  subscribe: (fn: (state: T) => void) => void;
  dispatch: (action: A) => void;
}

export default class BaseStore<T, A> implements IStore<T, A> {
  private subscribers: ((state: T) => void)[];
  private currentState: T;
  private reducer: (state: T, action: A) => T;

  constructor(reducer: (state: T, action: A) => T, initialState: T) {
    this.subscribers = [];
    this.currentState = initialState;
    this.reducer = reducer;
  }

  getState() {
    return this.currentState;
  }

  subscribe(fn: (state: T) => void) {
    this.subscribers.push(fn);
    fn(this.currentState);
  }

  dispatch(action: A) {
    this.currentState = this.reducer(this.currentState, action);
    this.subscribers.forEach((fn) => fn(this.currentState));
  }
}
