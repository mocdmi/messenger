import { AuthApi } from '@/api';
import { ROUTER } from '@/const';
import { Router, Store } from '@/core';
import { AppStore, UserState } from '@/store';
import { SignInRequestDto, SignUpRequestDto } from '@/types';

export default class AuthService {
    private readonly authApi = new AuthApi();
    private readonly router = Router.getInstance();
    private readonly store = Store.getInstance();

    async signUp(data: SignUpRequestDto): Promise<void> {
        try {
            this.store.set<UserState>('user', {
                ...this.store.getState<AppStore>().user,
                isLoading: true,
                isError: '',
            });

            const { status, response } = await this.authApi.create(data);

            this.store.set<boolean>('user.isLoading', false);

            if ('reason' in response) {
                this.store.set<string>('user.isError', response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error sign up. Status: ${status}`);
            }

            this.router.go(ROUTER.messenger);
        } catch (error) {
            throw error;
        }
    }

    async login(data: SignInRequestDto): Promise<void> {
        try {
            this.store.set<UserState>('user', {
                ...this.store.getState<AppStore>().user,
                isLoading: true,
                isError: '',
            });

            const { status, response } = await this.authApi.login(data);

            this.store.set<boolean>('user.isLoading', false);

            if (typeof response === 'object' && 'reason' in response) {
                this.store.set<string>('user.isError', response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error login. Status: ${status}`);
            }

            this.router.go(ROUTER.messenger);
        } catch (error) {
            throw error;
        }
    }

    async getUser(): Promise<void> {
        try {
            this.store.set<UserState>('user', {
                ...this.store.getState<AppStore>().user,
                isLoading: true,
                isError: '',
            });

            const { status, response } = await this.authApi.request();

            this.store.set<boolean>('user.isLoading', false);

            if (status === 401) {
                if (
                    this.router.getCurrentRoute()?.match(ROUTER.login) ||
                    this.router.getCurrentRoute()?.match(ROUTER.signUp)
                )
                    return;

                this.router.go(ROUTER.login);

                return;
            }

            if ('reason' in response) {
                this.store.set<string>('user.isError', response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error get user. Status: ${status}`);
            }

            if (
                this.router.getCurrentRoute()?.match(ROUTER.signUp) ||
                this.router.getCurrentRoute()?.match(ROUTER.login)
            ) {
                this.router.go(ROUTER.messenger);
            }

            this.store.set('user.user', response);
        } catch (error) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            this.store.set<UserState>('user', {
                ...this.store.getState<AppStore>().user,
                isLoading: true,
                isError: '',
            });

            const { status } = await this.authApi.logout();

            this.store.set<boolean>('user.isLoading', false);

            if (status !== 200) {
                throw new Error(`Error logout. Status: ${status}`);
            }

            this.store.set('user.user', null);
            this.router.go(ROUTER.login);
        } catch (error) {
            throw error;
        }
    }
}
