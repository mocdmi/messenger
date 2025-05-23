import { UserApi } from '@/api';
import { Store } from '@/core';
import { AppStore, UserState } from '@/store';
import { UpdateUserPasswordRequestDto, UserDto } from '@/types';

export default class UserService {
    private readonly store = Store.getInstance();
    private readonly userApi = new UserApi();

    async editUser(data: UserDto): Promise<void> {
        try {
            this.store.set<UserState>('user', {
                ...this.store.getState<AppStore>().user,
                isLoading: true,
                isError: '',
            });

            const { status, response } = await this.userApi.update(data);

            if ('reason' in response) {
                throw new Error(response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error edit user. Status: ${status}`);
            }

            this.store.set('user.user', response);
        } catch (error: unknown) {
            throw error;
        }
    }

    async editAvatar(file: File): Promise<void> {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            this.store.set<UserState>('user', {
                ...this.store.getState<AppStore>().user,
                isLoading: true,
                isError: '',
            });

            const { status, response } = await this.userApi.updateAvatar(formData);

            this.store.set<boolean>('user.isLoading', false);

            if ('reason' in response) {
                this.store.set<string>('user.isError', response.reason);
            }

            if (status !== 200) {
                throw new Error(`Error edit avatar. Status: ${status}`);
            }

            this.store.set('user.user', response);
        } catch (error: unknown) {
            throw error;
        }
    }

    async editPassword(data: UpdateUserPasswordRequestDto): Promise<void> {
        try {
            this.store.set<UserState>('user', {
                ...this.store.getState<AppStore>().user,
                isLoading: true,
                isError: '',
            });

            const { status } = await this.userApi.updatePassword(data);

            this.store.set<boolean>('user.isLoading', false);

            if (status !== 200) {
                throw new Error(`Error edit password. Status: ${status}`);
            }
        } catch (error: unknown) {
            throw error;
        }
    }
}
