import { ROUTER } from '@/const';
import { Route } from '@/core';
import { BlockConstructor } from '@/types';

export default class Router {
    private static instance: Router;
    private routes: Route[] = [];
    private currentRoute: Route | null = null;
    private rootQuery: string | undefined;

    private constructor() {}

    static getInstance(): Router {
        if (!Router.instance) {
            Router.instance = new Router();
        }

        return Router.instance;
    }

    getRoutes(): Route[] {
        return this.routes;
    }

    createApp(rootQuery: string): Router {
        this.rootQuery = rootQuery;
        return this;
    }

    start(): void {
        window.onpopstate = (event): void => {
            try {
                const path = (event.currentTarget as Window)?.location.pathname;
                this.onRoute(path);
            } catch (error) {
                console.error(error);
            }
        };

        try {
            this.onRoute(window.location.pathname);
        } catch {
            this.onRoute(ROUTER.notFound);
        }
    }

    private onRoute(path: string): void {
        const route = this.getBlockByPath(path);

        if (!route) {
            throw new Error(`Component not found for path: ${path}`);
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render();
    }

    use<TProps extends object>(path: string, block: unknown, props?: TProps): Router {
        const route = new Route(path, block as BlockConstructor, props, this.rootQuery!);
        this.routes.push(route);
        return this;
    }

    back(): void {
        history.back();
    }

    next(): void {
        history.forward();
    }

    go(path: string): void {
        try {
            history.pushState({}, '', path);
            this.onRoute(path);
        } catch (error) {
            console.error(error);
        }
    }

    getCurrentRoute(): Route | null {
        return this.currentRoute;
    }

    reset(): void {
        this.routes = [];
        this.currentRoute = null;
        this.rootQuery = undefined;
    }

    private getBlockByPath(path: string): Route | undefined {
        return this.routes.find((route) => route.match(path));
    }
}
