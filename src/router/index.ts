import { AppRoute, AppRoutesPath } from './types';
import { ROUTES, NOT_FOUND_ROUTE, MAIN_ROUTE } from './routes';
import routerMiddleware from '../utils/router-middleware';
import Notification from '../components/notification/notification';

const LOGGED_IN_ERROR_DURATION: number = 3000;

export class Router {
  constructor(
    private readonly routes: AppRoute[],
    private onHashChange: (route: AppRoute) => void
  ) {
    window.addEventListener('changeURL', this.onHashChangeHandler.bind(this) as EventListener);
    window.addEventListener('popstate', this.onHashChangeHandler.bind(this));
    this.onHashChangeHandler();
  }

  private onHashChangeHandler(): void {
    const pathname: string[] = location.pathname.split('/').slice(1);

    const matchedRoute: AppRoute | undefined = this.routes.find((route) => {
      const routePathSegments: string[] = route.path.split('/').slice(1);

      if (routePathSegments.length !== pathname.length) {
        return false;
      }

      const match: boolean = routePathSegments.every((routePathSegment: string, i: number): boolean => {
        return routePathSegment === pathname[i] || routePathSegment[0] === ':';
      });

      return match;
    });

    if (!matchedRoute) {
      this.onHashChange(NOT_FOUND_ROUTE);
    } else if (routerMiddleware(matchedRoute.path)) {
      window.history.pushState({}, '', AppRoutesPath.MAIN);
      new Notification('error', 'You are already logged in!', LOGGED_IN_ERROR_DURATION).showNotification();
      this.onHashChange(MAIN_ROUTE);
    } else {
      this.onHashChange(matchedRoute);
    }
  }
}

export function createRouter(routerOutlet: HTMLElement): Router {
  return new Router(ROUTES, (route) => {
    if (route) {
      routerOutlet.innerHTML = '';
      routerOutlet.append(route.component);

      document.body?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
}
