import { AuthApi, SignInRequestDto, SignUpRequestDto } from '@api';
import { ROUTER } from '@const';
import { Router, Store } from '@core';
import { AppStore } from '@types';

export default class AuthService {
    private readonly authApi = new AuthApi();
    private readonly router = Router.getInstance();
    private readonly store = Store.getInstance();

    constructor() {}

    async signUp(data: SignUpRequestDto): Promise<void> {
        try {
            const { status, response } = await this.authApi.create(data);

            if (status === 200) {
                this.router.go(ROUTER.messenger);
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
                this.router.go(ROUTER.messenger);
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
                Store.getInstance().set('user.user', response);
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
                this.router.go(ROUTER.login);
            } else {
                throw new Error(`Error logout. Status: ${status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
