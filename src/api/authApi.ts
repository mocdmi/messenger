import { BaseAPI, HTTPTransport } from '@core';
import {
    AuthUserResponseDto,
    SignInRequestDto,
    SignInResponseDto,
    SignUpRequestDto,
    SignUpResponseDto,
} from '../types';

export default class AuthApi extends BaseAPI {
    apiInstance = new HTTPTransport('/auth');

    async create(data: SignUpRequestDto) {
        return this.apiInstance.post<SignUpRequestDto, SignUpResponseDto>('/signup', { data });
    }

    async login(data: SignInRequestDto) {
        return this.apiInstance.post<SignInRequestDto, SignInResponseDto>('/signin', { data });
    }

    async request() {
        return this.apiInstance.get<void, AuthUserResponseDto>('/user');
    }

    async logout() {
        return this.apiInstance.post('/logout');
    }
}
