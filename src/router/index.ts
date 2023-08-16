import { AppRoute } from './types';
import { NOT_FOUND_COMPONENT, ROUTES } from './routes';

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

    this.onHashChange(matchedRoute ?? NOT_FOUND_COMPONENT);
  }
}

export function createRouter(routerOutlet: HTMLElement): Router {
  return new Router(ROUTES, (route) => {
    if (route) {
      routerOutlet.innerHTML = '';
      routerOutlet.append(route.component);
    }
  });
}
