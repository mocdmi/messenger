import { BaseAPI, HTTPTransport } from '@core';
import {
    SearchUserRequestDto,
    UpdateUserAvatarResponseDto,
    UpdateUserPasswordRequestDto,
    UpdateUserPasswordResponseDto,
    UserDto,
    UserResponseDto,
} from '../types';

export default class UserApi extends BaseAPI {
    apiInstance = new HTTPTransport('/user');

    async update(data: UserDto) {
        return this.apiInstance.put<UserDto, UpdateUserAvatarResponseDto>('/profile', { data });
    }

    async updateAvatar(data: FormData) {
        return this.apiInstance.put<FormData, UserResponseDto>('/profile/avatar', {
            data,
        });
    }

    async updatePassword(data: UpdateUserPasswordRequestDto) {
        return this.apiInstance.put<UpdateUserPasswordRequestDto, UpdateUserPasswordResponseDto>(
            '/password',
            { data },
        );
    }

    async search(data: SearchUserRequestDto) {
        return this.apiInstance.post<SearchUserRequestDto, UserResponseDto>('/search', { data });
    }
}
