import { ROUTER } from '@/const';
import Block from './block';
import { BlockConstructor } from '@/types';

jest.mock('./route', () => {
    class MockRoute {
        path: string;
        block: Block | null;
        BlockClass: BlockConstructor;
        context: object;
        rootQuery: string;
        render = jest.fn();
        getPath = jest.fn(() => this.path);
        leave = jest.fn();
        match = jest.fn((path: string) => path === this.path);

        constructor(
            path: string,
            BlockClass: BlockConstructor,
            props: object = {},
            rootQuery: string,
        ) {
            this.path = path;
            this.BlockClass = BlockClass;
            this.context = props;
            this.block = null;
            this.rootQuery = rootQuery;
        }
    }

    return {
        __esModule: true,
        default: MockRoute,
    };
});

import Router from './router';

describe('Router', () => {
    let component: unknown;
    let router: Router;

    beforeEach(() => {
        jest.clearAllMocks();
        component = jest.fn();

        router = Router.getInstance();
        router.reset();
        router.createApp('#app');
    });

    afterEach(() => {
        window.history.pushState({}, '', '/');
    });

    it('should be a singleton', () => {
        const router1 = Router.getInstance();
        const router2 = Router.getInstance();
        expect(router1).toBe(router2);
    });

    it('should register route and navigate to it', () => {
        router.use('/home', component);
        router.go('/home');

        const current = router.getCurrentRoute();
        expect(current?.render).toHaveBeenCalled();
        expect(current?.getPath()).toBe('/home');
    });

    it('should call history.back() on router.back()', () => {
        const spy = jest.spyOn(window.history, 'back');

        router.back();

        expect(spy).toHaveBeenCalled();

        spy.mockRestore();
    });

    it('should call history.forward() on router.forward()', () => {
        const spy = jest.spyOn(window.history, 'forward');

        router.next();

        expect(spy).toHaveBeenCalled();

        spy.mockRestore();
    });

    it('should navigate on popstate', () => {
        router.use('/test', component);
        router.use(ROUTER.notFound, component);
        router.createApp('#app');

        window.history.pushState({}, '', '/test');

        router.start();

        window.dispatchEvent(new PopStateEvent('popstate'));

        const current = router.getCurrentRoute();
        expect(current?.getPath()).toBe('/test');
        expect(current?.render).toHaveBeenCalled();
    });
});
