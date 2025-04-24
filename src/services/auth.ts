import { AuthApi, SignInRequestDto, SignUpRequestDto } from '../api/auth';
import { ROUTER } from '../const';
import { Router, Store } from '../core';

const authApi = new AuthApi();

export async function signUp(data: SignUpRequestDto) {
    try {
        const { status, response } = await authApi.create(data);

        if (status === 200) {
            return response;
        } else if ('reason' in response) {
            throw new Error(response.reason);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function login(data: SignInRequestDto) {
    try {
        const { status, response } = await authApi.login(data);

        if (status === 200) {
            Router.getInstance().go(ROUTER.messenger);
        } else if ('reason' in response) {
            throw new Error(response.reason);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getUserInfo() {
    try {
        const { status, response } = await authApi.me();

        if (status === 200) {
            Store.getInstance().set('user', response);
        } else if ('reason' in response) {
            throw new Error(response.reason);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function logout() {
    try {
        const { status } = await authApi.logout();

        if (status === 200) {
            Router.getInstance().go(ROUTER.login);
        } else {
            throw new Error(`Error logout. Status: ${status}`);
        }
    } catch (error) {
        console.error(error);
    }
}
