import { BaseAPI, HTTPTransport } from '@core';
import {
    SignInRequestDto,
    SignUpRequestDto,
    SignUpResponseDto,
    SignInResponseDto,
    UserResponseDto,
} from '../auth';

const authApiInstance = new HTTPTransport('/auth');

export default class AuthApi extends BaseAPI {
    async create(data: SignUpRequestDto) {
        return authApiInstance.post<SignUpRequestDto, SignUpResponseDto>('/signup', { data });
    }

    async login(data: SignInRequestDto) {
        return authApiInstance.post<SignInRequestDto, SignInResponseDto>('/signin', { data });
    }

    async me() {
        return authApiInstance.get<void, UserResponseDto>('/user');
    }

    async logout() {
        return authApiInstance.post('/logout');
    }
}
