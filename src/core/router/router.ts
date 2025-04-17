import { Block } from '../../core';
import { Route, BlockConstructor, Props } from '../router';

export default class Router {
    private static instance: Router;
    private routes: Route[] = [];
    private currentRoute: Route<Block> | null = null;
    private rootQuery = '';

    constructor(rootQuery: string) {
        if (!Router.instance) {
            Router.instance = this;
        }

        this.rootQuery = rootQuery;
    }

    start() {
        const path = window.location.pathname;

        window.onpopstate = () => {
            try {
                this.onRoute(path);
            } catch (error) {
                console.error(error);
            }
        };

        this.onRoute(path);
    }

    private onRoute(path: string) {
        const route = this.getBlockByPath(path);

        if (!route) {
            throw new Error(`Component not found for path: ${path}`);
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        route.render();
        this.currentRoute = route;
    }

    use<P extends object>(
        path: string,
        block: BlockConstructor<P>,
        props?: P & { rootQuery: string },
    ): Router {
        const route = new Route(path, block, {
            ...(props ?? {}),
            rootQuery: this.rootQuery,
        });
        this.routes.push(route);
        return this;
    }

    back() {
        history.back();
    }

    next() {
        history.back();
    }

    push(path: string) {
        try {
            history.pushState({}, '', path);
            this.onRoute(path);
        } catch (error) {
            console.error(error);
        }
    }

    private getBlockByPath(path: string): Route<Block> | undefined {
        return this.routes.find((route: Route<Block>) => route.match(path));
    }
}
