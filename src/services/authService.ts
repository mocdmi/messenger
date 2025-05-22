import { AuthApi } from '@/api';
import { ROUTER } from '@/const';
import { Router, Store } from '@/core';
import { SignInRequestDto, SignUpRequestDto } from '@/types';

export default class AuthService {
    private readonly authApi = new AuthApi();
    private readonly router = Router.getInstance();
    private readonly store = Store.getInstance();

    async signUp(data: SignUpRequestDto): Promise<void> {
        try {
            const { status, response } = await this.authApi.create(data);

            if ('reason' in response) {
                throw new Error(response.reason);
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
            const { status, response } = await this.authApi.login(data);

            if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
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
            const { status, response } = await this.authApi.request();

            if (status === 401) {
                this.router.go(ROUTER.login);
            }

            if ('reason' in response) {
                throw new Error(response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error get user. Status: ${status}`);
            }

            this.store.set('user.user', response);
        } catch (error) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            const { status } = await this.authApi.logout();

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
