import { AuthApi, SignInRequestDto, SignUpRequestDto } from '../api/auth';
import { ROUTER } from '../const';
import { Router, Store } from '../core';

export default class AuthService {
    private readonly authApi = new AuthApi();

    constructor() {}

    async signUp(data: SignUpRequestDto): Promise<void> {
        try {
            const { status, response } = await this.authApi.create(data);

            if (status === 200) {
                Router.getInstance().go(ROUTER.messenger);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async login(data: SignInRequestDto): Promise<void> {
        try {
            const { status, response } = await this.authApi.login(data);

            if (status === 200) {
                Router.getInstance().go(ROUTER.messenger);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(): Promise<void> {
        try {
            const { status, response } = await this.authApi.me();

            if (status === 200) {
                Store.getInstance().set('user', response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async logout(): Promise<void> {
        try {
            const { status } = await this.authApi.logout();

            if (status === 200) {
                Router.getInstance().go(ROUTER.login);
            } else {
                throw new Error(`Error logout. Status: ${status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
