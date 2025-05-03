import { UserApi } from '@api';
import { Store } from '@core';
import { UserUpdateRequestDto } from 'src/api/user/types';

export default class UserService {
    private readonly store = Store.getInstance();
    private readonly userApi = new UserApi();

    constructor() {}

    async editUser(data: UserUpdateRequestDto) {
        try {
            const { status, response } = await this.userApi.update(data);

            if (status === 200) {
                this.store.set('user.user', response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async editAvatar(file: File) {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const { status, response } = await this.userApi.updateAvatar(formData);

            if (status === 200) {
                this.store.set('user.user', response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
