import { BaseAPI, HTTPTransport } from '../../core';
import { SignUpRequestDto, SignUpResponseDto } from './types';

const authApiInstance = new HTTPTransport('/auth');

export default class AuthApi extends BaseAPI {
    async create(data: SignUpRequestDto) {
        return authApiInstance.post<SignUpRequestDto, SignUpResponseDto>('/signup', { data });
    }
}
