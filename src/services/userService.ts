import { UserApi } from '@/api';
import { Store } from '@/core';
import { UpdateUserPasswordRequestDto, UserDto } from '@/types';

export default class UserService {
    private readonly store = Store.getInstance();
    private readonly userApi = new UserApi();

    async editUser(data: UserDto): Promise<void> {
        try {
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
            const { status, response } = await this.userApi.updateAvatar(formData);

            if ('reason' in response) {
                throw new Error(response.reason);
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
            const { status } = await this.userApi.updatePassword(data);

            if (status !== 200) {
                throw new Error(`Error edit password. Status: ${status}`);
            }
        } catch (error: unknown) {
            throw error;
        }
    }
}
